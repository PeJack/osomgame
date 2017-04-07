package entities

var lastMessageID int32 = 1

// ChatMessage - сообщения в чате
type ChatMessage struct {
	ID        int32
	Text      string
	OwnerID   int32
	CreatedAt int64
}

// NewChatMessage - конструктор для сообщения
func NewChatMessage(text string, ownerID int32, createdAt int64) *ChatMessage {
	cm := &ChatMessage{
		ID:        lastMessageID,
		Text:      text,
		OwnerID:   ownerID,
		CreatedAt: createdAt,
	}

	lastMessageID++
	return cm
}
