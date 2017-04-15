package message

import (
	"github.com/osomgame/entities"

	"github.com/bitly/go-simplejson"
)

// GameStateMessage - ...
type GameStateMessage struct {
	Players   map[int32]*entities.Player
	Platforms map[int32]*entities.Platform
}

// WritePacket - ...
func (m *GameStateMessage) WritePacket() *simplejson.Json {
	packet := simplejson.New()
	packet.Set("players", m.Players)
	packet.Set("platforms", m.Platforms)

	return MakeMessage(`"gameState"`, packet)
}
