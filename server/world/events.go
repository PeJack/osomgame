package world

import (
	"log"
	"project/server/entities"
	"project/server/physics"
)

// GameEvent - базовое событие
type GameEvent interface {
	GetTime() uint64
	Execute(*GameState) error
}

// NewPlayerEvent - событие создания нового игрока
type NewPlayerEvent struct {
	Time     uint64
	ID       int64
	Color    string
	Position *physics.Point
}

func (e *NewPlayerEvent) GetTime() uint64 {
	return e.Time
}

func (e *NewPlayerEvent) Execute(state *GameState) error {
	state.Players[e.ID] = entities.NewPlayer(e.ID, e.Color, e.Position)
	return nil
}

// RemovePlayerEvent - событие удаления игрока
type RemovePlayerEvent struct {
	time uint64
	id   int64
}

func (e *RemovePlayerEvent) GetTime() uint64 {
	return e.time
}

func (e *RemovePlayerEvent) Execute(state *GameState) error {
	delete(state.Players, e.id)
	return nil
}

// IncreasePlayerVelocityEvent - ускорение игроку в выбранном направлении
type IncreasePlayerVelocityEvent struct {
	time      uint64
	id        int64
	direction int8
}

func (e *IncreasePlayerVelocityEvent) GetTime() uint64 {
	return e.time
}

func (e *IncreasePlayerVelocityEvent) Execute(state *GameState) error {
	p := state.Players[e.id]
	if p == nil {
		log.Println("IncreaseVelocityEvent - player doesn't exist")
		return nil
	}

	p.Direction = e.direction
	return nil
}

// PlayerAttackEvent - событие атаки игрока
type PlayerAttackEvent struct {
	time   uint64
	id     int64
	radius float64
}

func (e *PlayerAttackEvent) GetTime() uint64 {
	return e.time
}

func (e *PlayerAttackEvent) Execute(state *GameState) error {
	p := state.Players[e.id]
	if p == nil {
		log.Println("PlayerAttackEvent - player doesn't exist")
		return nil
	}

	return nil
}

// GameUpdateEvent - событие обновления игры
type GameUpdateEvent struct {
	time        uint64
	syncedUntil uint64
}

func (e *GameUpdateEvent) GetTime() uint64 {
	return e.time
}

func (e *GameUpdateEvent) Execute(state *GameState) error {
	// Удаляет игроков, которые успели синхронизировать свой "мертвый" статус
	for id, p := range state.Players {
		if !p.IsAlive && p.DeadTimer <= e.syncedUntil {
			delete(state.Players, id)
		}
	}
	return nil
}
