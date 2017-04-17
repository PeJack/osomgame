package net

import (
	"encoding/json"
	"log"
	netmsg "project/net/messages"
	"time"

	"github.com/gorilla/websocket"
)

const (
	// Time allowed to write a message to the peer.
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer.
	pongWait = 60 * time.Second

	// Send pings to peer with this period. Must be less than pongWait.
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer.
	maxMessageSize = 512
)

// Connection - прослойка между websocket и hub
type Connection struct {
	ws *websocket.Conn

	send    chan *netmsg.Message
	receive chan *netmsg.Message
}

// NewConnection - конструктор для подключения
func NewConnection(_ws *websocket.Conn) *Connection {
	connection := &Connection{
		ws:      _ws,
		send:    make(chan *netmsg.Message, 256),
		receive: make(chan *netmsg.Message, 256),
	}

	go connection.Reader()
	go connection.Writer()

	return connection
}

// Writer - ...
func (c *Connection) Writer() {
	ticker := time.NewTicker(pingPeriod)

	defer func() {
		ticker.Stop()
	}()

	for {
		select {
		case message := <-c.send:
			if err := c.ws.WriteJSON(message); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.ws.WriteJSON(websocket.PingMessage); err != nil {
				return
			}
		}
	}
}

// Reader - ...
func (c *Connection) Reader() {
	defer func() {
		c.Close()
	}()

	// c.ws.SetReadLimit(maxMessageSize)
	// c.ws.SetReadDeadline(time.Now().Add(pongWait))
	// c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, raw, err := c.ws.ReadMessage()
		if err != nil {
			break
		}

		var message netmsg.Message
		err = json.Unmarshal(raw, &message)
		if err != nil {
			log.Println("Can't parse the message", err)
			continue
		}

		c.receive <- &message
	}
}

// Close - ...
func (c *Connection) Close() {

	// Close send channel
	close(c.send)

	// Close receive channel
	close(c.receive)

	// Close the websocket
	c.ws.Close()
}
