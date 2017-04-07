package message

import "github.com/bitly/go-simplejson"

// SettingsMessage - ...
type SettingsMessage struct {
	CanvasWidth  int32
	CanvasHeight int32
	Friction     float32
	Gravity      float32
}

// WritePacket - ...
func (m *SettingsMessage) WritePacket() *simplejson.Json {
	packet := simplejson.New()
	packet.Set("canvasWidth", m.CanvasWidth)
	packet.Set("canvasHeight", m.CanvasHeight)
	packet.Set("friction", m.Friction)
	packet.Set("gravity", m.Gravity)

	return MakeMessage(`"getSettings"`, packet)
}
