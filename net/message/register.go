package message

import (
	"github.com/osomgame/entities"

	"github.com/bitly/go-simplejson"
)

// RegisterMessage - ...
type RegisterMessage struct {
	Player    entities.Player
	Players   map[int32]*entities.Player
	Platforms map[int32]*entities.Platform
}

// WritePacket - ...
func (m *RegisterMessage) WritePacket() *simplejson.Json {
	packet := simplejson.New()
	packet.Set("player", m.Player)
	packet.Set("players", m.Players)
	packet.Set("platforms", m.Platforms)

	return MakeMessage(`"register"`, packet)
}
