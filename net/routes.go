package net

import (
	"fmt"

	"github.com/osomgame/entities"

	simplejson "github.com/bitly/go-simplejson"

	"github.com/osomgame/args"
	netmsg "github.com/osomgame/net/message"
)

// GenerateRoutes - генерирует пути для запросов
func GenerateRoutes() {
	router.Add("getSettings", func(data *simplejson.Json, c *Connection) {
		message := &netmsg.SettingsMessage{
			CanvasWidth:  args.CANVAS_WIDTH,
			CanvasHeight: args.CANVAS_HEIGHT,
			Friction:     args.FRICTION,
			Gravity:      args.GRAVITY,
		}

		c.send <- message.WritePacket()
		fmt.Printf("getSettings - Send settings to client\n")
	})

	router.Add("register", func(data *simplejson.Json, c *Connection) {
		player := entities.NewPlayer(20.0, 20.0, 20, 20, 4)
		c.AssignToPlayer(player)

		message1 := &netmsg.RegisterMessage{
			Player: *player,
		}

		c.send <- message1.WritePacket()

		message2 := &netmsg.GameStateMessage{
			Players:   entities.Players,
			Platforms: entities.Platforms,
		}

		Hub.broadcast <- message2.WritePacket()
		fmt.Printf("register - Connection opened for player %v\n", player.ID)
	})

	router.Add("move", func(data *simplejson.Json, c *Connection) {
		player := data.Get("player")
		x, _ := player.Get("x").Float64()
		y, _ := player.Get("y").Float64()
		speed, _ := player.Get("speed").Float64()

		c.player.X = x
		c.player.Y = y
		c.player.Speed = speed

		message := &netmsg.MoveMessage{
			ID:    c.player.ID,
			X:     c.player.X,
			Y:     c.player.Y,
			Speed: c.player.Speed,
		}

		Hub.broadcast <- message.WritePacket()
	})

	router.Add("closeConn", func(data *simplejson.Json, c *Connection) {
		c.player.Destroy()

		message := &netmsg.GameStateMessage{
			Players:   entities.Players,
			Platforms: entities.Platforms,
		}

		Hub.broadcast <- message.WritePacket()
		fmt.Printf("closeConn - Connection closed for player %v\n", c.player.ID)
	})

}
