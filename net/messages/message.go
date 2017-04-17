package messages

import "encoding/json"

// Message - формат сообщения, получаемое и отправляемое клиентам
type Message struct {
	Type string           `json:"type"`
	Time uint64           `json:"time"`
	Data *json.RawMessage `json:"data"`
}
