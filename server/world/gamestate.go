package world

import (
	"log"
	"project/server/entities"
)

// GameState - статус игрового мира
type GameState struct {
	Time      uint64
	Players   map[int64]*entities.Player
	Platforms map[int64]*entities.Platform
}

// NewGameState - конструктор GameState
func NewGameState(t uint64) *GameState {
	return &GameState{
		Time:      t,
		Players:   make(map[int64]*entities.Player),
		Platforms: make(map[int64]*entities.Platform),
	}
}

// Update - обновление состояния игры
func (s *GameState) Update(t uint64) *GameState {
	if t < s.Time {
		log.Printf("Call update with time lower than previous update: %d, %d", s.Time, t)
		return nil
	}

	state := NewGameState(t)

	for _, obj := range s.Players {
		p := obj.Update(t, s.Time)
		if p != nil {
			state.Players[p.ID] = p
		}
	}

	// for _, o := range s.Platforms {
	// 	p := o.Update(t, s.Time)
	// 	if p != nil {
	// 		state.Platforms[p.Id] = p
	// 	}
	// }

	return state
}
