// TODO:
// 1) пофиксить баг с вылетом сервера при конкурентном вызове writePump (sync.mutex)
// 2) перестроить данные ответа (response)

package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"log"

	"github.com/gorilla/websocket"
)

const (
	canvasWidth  = 600
	canvasHeight = 400
	friction     = 0.8
	gravity      = 0.3
)

var players = make(map[int32]*player)
var platforms = make([]*platform, 0, 10)
var settings = make(map[string]string)

var lastPlayerId int32 = 1
var lastMsgId int32 = 1
var lastPlatformId int32 = 1

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func handler(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	c := &connection{send: make(chan []byte, 256), ws: conn}
	h.register <- c
	go c.writePump()
	c.readPump()
}

func main() {
	platforms = append(platforms, &platform{
		Id:     lastPlatformId,
		Pos:    []int32{0, 0},
		Width:  10,
		Height: canvasHeight,
	})
	lastPlatformId++

	platforms = append(platforms, &platform{
		Id:     lastPlatformId,
		Pos:    []int32{0, canvasHeight - 2},
		Width:  canvasWidth,
		Height: 50,
	})
	lastPlatformId++

	platforms = append(platforms, &platform{
		Id:     lastPlatformId,
		Pos:    []int32{canvasWidth - 10, 0},
		Width:  50,
		Height: canvasHeight,
	})
	lastPlatformId++

	platforms = append(platforms, &platform{
		Id:     lastPlatformId,
		Pos:    []int32{60, 90},
		Width:  80,
		Height: 80,
	})
	lastPlatformId++

	platforms = append(platforms, &platform{
		Id:     lastPlatformId,
		Pos:    []int32{170, 190},
		Width:  80,
		Height: 80,
	})
	lastPlatformId++

	platforms = append(platforms, &platform{
		Id:     lastPlatformId,
		Pos:    []int32{350, 230},
		Width:  80,
		Height: 80,
	})
	lastPlatformId++

	platforms = append(platforms, &platform{
		Id:     lastPlatformId,
		Pos:    []int32{550, 300},
		Width:  40,
		Height: 100,
	})
	lastPlatformId++

	router.Add("getSettings", func(data interface{}, c *connection) {
		settings["canvasWidth"] = strconv.Itoa(canvasWidth)
		settings["canvasHeight"] = strconv.Itoa(canvasHeight)
		settings["friction"] = fmt.Sprintf("%.1f", friction)
		settings["gravity"] = fmt.Sprintf("%.1f", gravity)

		response := Response{
			Method:    "getSettings",
			Platforms: platforms,
			Settings:  settings,
		}

		resp, err := json.Marshal(response)
		if err != nil {
			fmt.Errorf("Error marshal response %v\n", err)
			return
		}

		// h.broadcast <- resp
		c.send <- resp

		fmt.Printf("Send settings to client\n")

	})

	router.Add("register", func(data interface{}, c *connection) {
		player := &player{
			Id:     lastPlayerId,
			Pos:    []float32{20.0, 20.0},
			Width:  20,
			Height: 20,
		}

		lastPlayerId++
		player.c = c

		players[player.Id] = player
		response := Response{
			Method:  "register",
			Player:  *player,
			Players: players,
		}

		resp, err := json.Marshal(response)
		if err != nil {
			fmt.Errorf("Error marshal response %v\n", err)
			return
		}

		h.broadcast <- resp

		fmt.Printf("Connection opened: %v\n", player)
	})

	router.Add("move", func(data interface{}, c *connection) {
		request := data.(*Request)
		player := request.Player

		response := Response{
			Method: "move",
			Player: player,
		}

		if players[player.Id] != nil {
			players[player.Id] = &player
		}

		resp, err := json.Marshal(response)

		if err != nil {
			fmt.Errorf("Error marshal response %v\n", err)
			return
		}

		h.broadcast <- resp
	})

	router.Add("sendMsgToChat", func(data interface{}, c *connection) {
		request := data.(*Request)
		message := request.Message

		message.Id = lastMsgId
		lastMsgId++

		response := Response{
			Method:  "sendMsgToChat",
			Message: message,
		}

		resp, err := json.Marshal(response)

		if err != nil {
			fmt.Errorf("Error marshal response %v\n", err)
			return
		}

		h.broadcast <- resp
	})

	router.Add("closeConn", func(data interface{}, c *connection) {
		request := data.(*Request)
		player := request.Player

		delete(players, player.Id)

		response := Response{
			Method: "gameState",
			Player: player,
		}

		resp, err := json.Marshal(response)

		if err != nil {
			fmt.Errorf("Error marshal response %v\n", err)
			return
		}

		h.broadcast <- resp

		fmt.Printf("Connection closed: %v\n", player)
	})

	go h.run()
	http.Handle("/", http.FileServer(http.Dir("./resources")))
	http.HandleFunc("/ws", handler)

	fmt.Print("Server started at port :8080\n")

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}

}
