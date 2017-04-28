package net

import (
	"math"
	"time"

	"project/server/helpers"
	"project/server/physics"
	"project/server/world"
)

const (
	gameUpdatePeriod = 10 * time.Millisecond
	updateTimeBuffer = 2000 // in milliseconds
)

type hub struct {
	clients map[*Client]bool

	register chan *Client

	unregister chan *Client

	history *world.GameHistory

	nextId int64
}

// Hub - хранилище клиентов, регистрация и рутинг
var Hub = newHub()

func newHub() *hub {
	return &hub{
		clients:    make(map[*Client]bool),
		register:   make(chan *Client),
		unregister: make(chan *Client),
		history:    world.NewGameHistory(),
	}
}

func (h *hub) run() {
	gameUpdateTicker := time.NewTicker(gameUpdatePeriod)
	defer func() {
		gameUpdateTicker.Stop()
	}()

	for {
		select {
		case c := <-h.register:
			h.clients[c] = true

			playerID := h.generateId()
			color := helpers.RandomColor()
			pos := physics.MakePoint(float64(helpers.Random(-1000, 1000)), float64(helpers.Random(-1000, 1000)))

			c.Init(playerID, color, pos)
		case c := <-h.unregister:
			if _, ok := h.clients[c]; ok {
				c.connection.Close()
				delete(h.clients, c)
			}
		case <-gameUpdateTicker.C:
			h.history.GameUpdate(h.lowestSeenUpdateTime())
		}
	}
}

func (h *hub) generateId() int64 {
	h.nextId++
	return h.nextId
}

func (h *hub) lowestSeenUpdateTime() uint64 {
	var lowest uint64 = math.MaxUint64
	for c, _ := range h.clients {
		t := c.LastUpdateTime() - updateTimeBuffer
		if t < lowest {
			lowest = t
		}
	}

	return lowest
}
