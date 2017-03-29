package main

import (
	"encoding/json"
	"fmt"
)

// Router - структура роутера
type Router struct {
	routes map[string]func(interface{}, *connection)
}

// NewRouter ...
func NewRouter() *Router {
	return &Router{
		routes: make(map[string]func(interface{}, *connection)),
	}
}

// Add - добавление типа команды в роутер
func (r *Router) Add(name string, function func(interface{}, *connection)) {
	r.routes[name] = function
}

// Dispatch - Отправка команды на клиент
func (r *Router) Dispatch(data []byte, c *connection) {
	req := &Request{}
	err := json.Unmarshal(data, req)

	if err != nil {
		fmt.Printf("Request unmarshal error: %v\n", err)
		return
	}

	// поиск методов из достуных в данном роутере
	method, ok := r.routes[req.Method]

	if !ok {
		fmt.Printf("Method '%v' not found\n", req.Method)
		return
	}

	method(req, c)
}

var router = NewRouter()
