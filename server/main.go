package main

import (
	"project/server/args"
	"project/server/net"
)

func main() {
	net.Listen(args.PORT)
}
