package net

import (
	"fmt"

	simplejson "github.com/bitly/go-simplejson"
)

// Router - структура роутера
type Router struct {
	routes map[string]func(*simplejson.Json, *Connection)
}

// NewRouter ...
func NewRouter() *Router {
	return &Router{
		routes: make(map[string]func(*simplejson.Json, *Connection)),
	}
}

// Add - добавление типа команды в роутер
func (r *Router) Add(name string, function func(*simplejson.Json, *Connection)) {
	r.routes[name] = function
}

// Dispatch - Отправка команды на клиент
func (r *Router) Dispatch(_method string, msg *simplejson.Json, c *Connection) {
	method, ok := r.routes[_method]

	if !ok {
		fmt.Printf("Method '%v' not found\n", _method)
		return
	}

	method(msg, c)
}

var router = NewRouter()
