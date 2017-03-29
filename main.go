package main

import (
	"encoding/json"
	"fmt"
	"net/http"

	"log"

	"github.com/gorilla/websocket"
)

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

var players = make(map[int32]*player)
var lastPlayerId int32 = 1
var lastMsgId int32 = 1

func main() {
	router.Add("register", func(data interface{}, c *connection) {
		request := data.(*Request)
		player := request.Player

		if player.Id == 0 {
			player.Id = lastPlayerId
			lastPlayerId++

			player.c = c
			players[player.Id] = &player

			response := Response{
				Method:  "register",
				Player:  player,
				Players: players,
			}

			resp, err := json.Marshal(response)

			if err != nil {
				fmt.Errorf("Error marshal response %v\n", err)
				return
			}

			h.broadcast <- resp
		}

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

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
