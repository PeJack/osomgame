package entities

var lastPlayerID int32 = 1

// Players - массив игроков
var Players = make(map[int32]*Player)

// Player - игрок
type Player struct {
	ID     int32
	X      float64
	Y      float64
	Width  int32
	Height int32
	Speed  float64
}

// NewPlayer - конструктор для игрока
func NewPlayer(x float64, y float64, width int32, height int32, speed float64) *Player {
	p := &Player{
		ID:     lastPlayerID,
		X:      x,
		Y:      y,
		Width:  width,
		Height: height,
		Speed:  speed,
	}

	Players[p.ID] = p
	lastPlayerID++

	return p
}

// Destroy - удаляет игрока из массива игроков
func (p *Player) Destroy() {
	delete(Players, p.ID)
}

// Move - ...
func (p *Player) Move(dir string) {
	switch dir {
	case "LEFT":
		p.X -= p.Speed
	case "RIGHT":
		p.X += p.Speed
	case "UP":
		p.Y -= p.Speed
	case "DOWN":
		p.Y += p.Speed
	}

	Players[p.ID] = p
}
