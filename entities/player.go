package entities

import "project/physics"

// Player - игрок
type Player struct {
	ID        int64
	Position  *physics.Point
	Width     float64
	Height    float64
	Color     string
	Speed     float64
	Velocity  *physics.Vector
	Angle     float64
	Healt     float64
	Direction int8
	DeadTimer uint64

	// Состояния игрока
	IsJumping  bool
	IsClimbing bool
	IsFalling  bool
	IsMoving   bool
	IsAlive    bool
}

// NewPlayer - конструктор для игрока
func NewPlayer(id int64, color string, pos *physics.Point) *Player {
	p := &Player{
		ID:         id,
		Position:   pos,
		Color:      color,
		IsJumping:  false,
		IsClimbing: false,
		IsFalling:  false,
		IsMoving:   false,
	}

	return p
}

// Update - обновляет состояние игрока, исходя из GameState
func (p *Player) Update(upTime uint64, lastUpTime uint64) *Player {
	// Время после последнего обновления
	// elapsedMillis := upTime - lastUpTime
	// elapsed := float64(elapsedMillis) / 1000

	// Вычисляем угол наклона игрока
	// angle := p.Angle
	// if p.Rotation != 0 {
	// 	angle = p.Angle + (elapsed * float64(p.Rotation))
	// 	for angle < 0 {
	// 		angle += 360
	// 	}
	// 	for angle >= 360 {
	// 		angle -= 360
	// 	}
	// 	angle = physics.RoundToPlaces(angle, 1)
	// }

	// Вычисляем ускорение игрока
	// vel := p.Velocity
	// if p.Acceleration == 1 {
	// 	accel := physics.AngleAndSpeedToVector(angle, p.AccelerationRate)
	// 	vel = physics.AddVectors(p.Velocity, physics.MultiplyVector(accel, elapsed))
	// }

	// // Apply drag
	// vel = physics.AddVectors(vel, physics.MultiplyVector(p.Velocity, elapsed))

	// // Calculate new position
	// pos := physics.MakePoint(p.X+vel.X*elapsed, p.Y+vel.Y*elapsed)

	return &Player{
		ID:       p.ID,
		Position: p.Position,
		Width:    p.Width,
		Height:   p.Height,
		Color:    p.Color,
		Speed:    p.Speed,
		Velocity: p.Velocity,
		Angle:    p.Angle,

		// Состояния игрока
		IsJumping:  p.IsJumping,
		IsClimbing: p.IsClimbing,
		IsMoving:   p.IsMoving,
		IsAlive:    p.IsAlive,
	}
}
