package net

type hub struct {
	connections map[*Connection]bool

	broadcast chan interface{}

	register chan *Connection

	unregister chan *Connection
}

func newHub() *hub {
	return &hub{
		broadcast:   make(chan interface{}),
		register:    make(chan *Connection),
		unregister:  make(chan *Connection),
		connections: make(map[*Connection]bool),
	}
}

// Hub - хранилище подключений, регистрация и рутинг, удаление подключений
var Hub = newHub()

func (h *hub) run() {
	for {
		select {
		case c := <-h.register:
			h.connections[c] = true
		case c := <-h.unregister:
			if _, ok := h.connections[c]; ok {
				delete(h.connections, c)
				c.Close()
			}
		case m := <-h.broadcast:
			for c := range h.connections {
				c.send <- m
			}
		}
	}
}
