package net

import (
	"fmt"
	"project/entities"
	"time"

	"github.com/bitly/go-simplejson"
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

	send chan interface{}

	player *entities.Player
}

// NewConnection - конструктор для подключения
func NewConnection(_ws *websocket.Conn) {
	connection := &Connection{
		ws:   _ws,
		send: make(chan interface{}),
	}

	Hub.register <- connection

	go connection.Reader()
	go connection.Writer()
}

// AssignToPlayer - присваивает подключению игрока (entities -> Player)
func (c *Connection) AssignToPlayer(_player *entities.Player) {
	if _player == nil {
		panic("Connection - Player can't be nil")
	}

	c.player = _player
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
		Hub.unregister <- c
	}()

	c.ws.SetReadLimit(maxMessageSize)
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })

	for {
		_, message, err := c.ws.ReadMessage()
		if err != nil {
			break
		}

		msg, err := simplejson.NewJson([]byte(message))
		if err != nil {
			fmt.Println("Can't parse the message:", string(message))
			continue
		}

		c.processMessage(msg)
	}
}

func (c *Connection) processMessage(msg *simplejson.Json) {
	method, err := msg.Get("method").String()

	if len(method) < 1 || err != nil {
		fmt.Println("Method cannot be nil:", msg)
		return
	}

	router.Dispatch(method, msg, c)
}

// Close - ...
func (c *Connection) Close() {
	// Close send channel
	close(c.send)

	// Close the websocket
	c.ws.Close()

	c.player = nil
}
