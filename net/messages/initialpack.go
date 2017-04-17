package messages

import "project/world"

// InitialPack - пакет данных для инициализации
type InitialPack struct {
	PlayerID int64            `json:"playerId"`
	State    *world.GameState `json:"state"`
}
