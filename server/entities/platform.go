package entities

var lastPlatformID int32 = 1

// Platforms - массив платформ
var Platforms = make(map[int32]*Platform)

// Platform - физические платформы
type Platform struct {
	ID     int32
	X      float32
	Y      float32
	Width  int32
	Height int32
}

// NewPlatform - конструктор для платформ
func NewPlatform(x float32, y float32, width int32, height int32) *Platform {
	p := &Platform{
		ID:     lastPlatformID,
		X:      x,
		Y:      y,
		Width:  width,
		Height: height,
	}

	Platforms[p.ID] = p
	lastPlatformID++
	return p
}
