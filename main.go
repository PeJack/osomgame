// TODO:
// 1) Написать обработчик, вызываемый при нажатии клавиши на клиенте;
// 2) Обрабатывать нажатия клавиш на сервере, добавить физику игрока на сервере;
// 3) Написать нормальный обработчик удаления игрока из игры и контроля стейтов сервера;
// 4) Синхронизировать физику клиента и физику сервера (с колизиями)

package main

import (
	"project/args"
	"project/net"
)

func main() {
	net.Listen(args.PORT)
}
