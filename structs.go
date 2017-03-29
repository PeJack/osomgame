package main

type player struct {
	Id      int32
	Pos     []int32
	Size    int32
	Speed   int32
	Message string
	c       *connection
}

type message struct {
	Id        int32
	Text      string
	OwnerId   int32
	CreatedAt int64
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
	Method  string
	Player  player
	Players map[int32]*player
	Message message
}
