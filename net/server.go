package net

import (
	"fmt"
	"log"
	"net/http"
	"project/helpers"

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
	// Handshake
	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	// Add connection
	NewConnection(ws)
}

// Listen - слушать изменения по указанному порту
func Listen(port int) {
	GenerateRoutes()
	helpers.LevelHelper.Generate()

	go Hub.run()

	http.Handle("/", http.FileServer(http.Dir("./resources")))
	http.HandleFunc("/ws", handler)

	fmt.Printf("Server started at port :%v\n", port)

	err := http.ListenAndServe(fmt.Sprintf(":%v", port), nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}
