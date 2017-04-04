package main

import (
	"sync"
)

type player struct {
	Id      int32
	Pos     []float32
	Width   int32
	Height  int32
	Speed   int32
	Message string
	c       *connection
	mu      sync.Mutex
}

type message struct {
	Id        int32
	Text      string
	OwnerId   int32
	CreatedAt int64
}

type platform struct {
	Id     int32
	Pos    []int32
	Width  int32
	Height int32
}

// Request ...
type Request struct {
	Method     string
	Player     player
	Message    message
	EntityType string
}

// Response ...
type Response struct {
	Method    string
	Player    player
	Players   map[int32]*player
	Message   message
	Platforms []*platform
	Settings  map[string]string
}
