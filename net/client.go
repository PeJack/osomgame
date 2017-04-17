package net

import (
	"encoding/json"
	"fmt"
	"log"
	"sync"

	"project/helpers"
	netmsg "project/net/messages"
	"project/physics"
	"project/world"
)

// Client - прослойка между игроком и вебсокетом
type Client struct {
	connection *Connection
	playerID   int64

	lastAppliedEventId uint64

	lastUpdateTime   uint64
	lastUpdateTimeMu sync.Mutex
}

// NewClient - конструктор
func NewClient(conn *Connection) {
	client := &Client{
		connection: conn,
	}

	Hub.register <- client
}

// Init - инициализация клиента, создание игрока
func (c *Client) Init(playerId int64, color string, pos *physics.Point) {
	event := &world.NewPlayerEvent{
		helpers.MakeTimestamp(),
		playerId,
		color,
		pos,
	}

	state := Hub.history.Run(event)
	c.playerID = playerId

	initPack := &netmsg.InitialPack{
		PlayerID: playerId,
		State:    state,
	}

	b, err := json.Marshal(initPack)
	if err != nil {
		log.Println("Error marshalling initial state", err)
		return
	}
	raw := json.RawMessage(b)
	c.Send(&netmsg.Message{Type: "init", Time: helpers.MakeTimestamp(), Data: &raw})

	log.Printf("Client Starting: %v \n", c.playerID)

	// обновление последнего времени синхронизации
	c.setLastUpdateTime(state.Time)

	go c.run()
}

func (c *Client) run() {
	defer func() {
		Hub.unregister <- c
		close(c.connection.send)
	}()

	for {
		select {
		case message, ok := <-c.connection.receive:
			if !ok {
				log.Println(fmt.Sprintf("Client stoped for player: %v", c.playerID))
				return
			}
			c.processMessage(message)
		}
	}
}

func (c *Client) processMessage(message *netmsg.Message) {
	switch message.Type {
	case "getState":
		state := Hub.history.CurrentState()
		c.SendUpdate(state)
	}
}

func (c *Client) updateLastAppliedEvent(eventID uint64) {
	if eventID > c.lastAppliedEventId {
		c.lastAppliedEventId = eventID
	} else {
		log.Printf("Client got out-of-order event id: %d, %d", c.lastAppliedEventId, eventID)
		return
	}
}

// SendUpdate - отправка обновленного состояния игры
func (c *Client) SendUpdate(state *world.GameState) {
	gsPack, err := json.Marshal(&netmsg.GameStatePack{state, c.lastAppliedEventId})
	if err != nil {
		log.Println("Error marshalling update", err)
		return
	}

	raw := json.RawMessage(gsPack)
	c.Send(&netmsg.Message{Type: "update", Time: helpers.MakeTimestamp(), Data: &raw})

	// обновление последнего времени синхронизации
	c.setLastUpdateTime(state.Time)
}

// Send - отправка сообщения на канал send
func (c *Client) Send(message *netmsg.Message) {
	c.connection.send <- message
}

func (c *Client) setLastUpdateTime(t uint64) {
	c.lastUpdateTimeMu.Lock()
	defer c.lastUpdateTimeMu.Unlock()
	c.lastUpdateTime = t
}

// LastUpdateTime - последнее время обновление состояния
func (c *Client) LastUpdateTime() uint64 {
	c.lastUpdateTimeMu.Lock()
	defer c.lastUpdateTimeMu.Unlock()
	return c.lastUpdateTime
}
