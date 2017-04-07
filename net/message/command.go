package message

import "github.com/bitly/go-simplejson"

// CommandMessage - ...
type CommandMessage struct {
	PlayerID int32
	Command  string
}

// WritePacket - ...
func (m *CommandMessage) WritePacket() *simplejson.Json {
	packet := simplejson.New()
	packet.Set("playerId", m.PlayerID)
	packet.Set("command", m.Command)

	return MakeMessage(`"command"`, packet)
}
