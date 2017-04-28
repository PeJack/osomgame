package systems

// Input - система управления игрока
type Input struct {
	UpKeyPressed     bool
	DownKeyPressed   bool
	LeftKeyPressed   bool
	RightKeyPressed  bool
	UpKeyReleased    bool
	DownKeyReleased  bool
	LeftKeyReleased  bool
	RightKeyReleased bool
}

// NewInput - констуруктор для системы управления
func NewInput() *Input {
	return &Input{
		UpKeyPressed:     false,
		DownKeyPressed:   false,
		LeftKeyPressed:   false,
		RightKeyPressed:  false,
		UpKeyReleased:    false,
		DownKeyReleased:  false,
		LeftKeyReleased:  false,
		RightKeyReleased: false,
	}
}

func (i *Input) onKeyDown(key string) {
	switch key {
	case "UP":
		i.UpKeyPressed = true
	case "DOWN":
		i.DownKeyPressed = true
	case "LEFT":
		i.LeftKeyPressed = true
	case "RIGHT":
		i.RightKeyPressed = true
	}
}

func (i *Input) onKeyUp(key string) {
	switch key {
	case "UP":
		i.UpKeyReleased = true
	case "DOWN":
		i.DownKeyReleased = true
	case "LEFT":
		i.LeftKeyReleased = true
	case "RIGHT":
		i.RightKeyReleased = true
	}
}
