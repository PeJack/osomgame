package helpers

import (
	"github.com/osomgame/args"
	"github.com/osomgame/entities"
)

// LevelHelper - хелпер для создания уровней
var LevelHelper *levelHelper

type levelHelper struct{}

func init() {
	LevelHelper = &levelHelper{}
}

func (h *levelHelper) Generate() {
	entities.NewPlatform(0, 0, 10, args.CANVAS_HEIGHT)
	entities.NewPlatform(0, args.CANVAS_HEIGHT-2, args.CANVAS_WIDTH, 50)
	entities.NewPlatform(args.CANVAS_WIDTH-10, 0, 50, args.CANVAS_HEIGHT)
	entities.NewPlatform(60, 90, 80, 80)
	entities.NewPlatform(170, 190, 80, 80)
	entities.NewPlatform(350, 230, 80, 80)
	entities.NewPlatform(550, 300, 40, 100)
}
