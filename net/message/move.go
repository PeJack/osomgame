package message

import "github.com/bitly/go-simplejson"

// MoveMessage - ...
type MoveMessage struct {
	ID    int32
	X     float64
	Y     float64
	Speed float64
}

// WritePacket - ...
func (m *MoveMessage) WritePacket() *simplejson.Json {
	packet := simplejson.New()
	packet.Set("id", m.ID)
	packet.Set("x", m.X)
	packet.Set("y", m.Y)
	packet.Set("speed", m.Speed)

	return MakeMessage(`"move"`, packet)
}
