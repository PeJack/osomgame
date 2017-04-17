package messages

import "project/world"

// GameStatePack - состояние игрового мира
type GameStatePack struct {
	State       *world.GameState `json:"state"`
	LastEventId uint64           `json:"lastEvent"`
}
