package world

import (
	"container/list"
	"project/helpers"
	"sync"
)

const (
	msToKeepHistoryEvents = 10000 // удаляет историю, старше 10 секунд
)

// StateMutationFunction - mutex для GameState
type StateMutationFunction func(*GameState) error

// GameHistory - история игры
type GameHistory struct {
	events *list.List
	mu     sync.Mutex
}

// GameHistoryEntry - структура одной записи в истории игры
type GameHistoryEntry struct {
	time  uint64
	state *GameState
	event GameEvent
}

// NewGameHistory - конструктор GameHistory
func NewGameHistory() *GameHistory {
	events := list.New()

	now := helpers.MakeTimestamp()
	state := NewGameState(now)
	events.PushBack(&GameHistoryEntry{now, state, nil})

	return &GameHistory{
		events: events,
	}
}

// Run - накидывает блокировку и запускает событие
func (h *GameHistory) Run(event GameEvent) *GameState {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.run(event.GetTime(), event)
}

// GameUpdate - основной метод для обновления состояния игры
func (h *GameHistory) GameUpdate(syncedUntil uint64) *GameState {
	h.mu.Lock()
	defer h.mu.Unlock()
	now := helpers.MakeTimestamp()

	return h.run(now, &GameUpdateEvent{now, syncedUntil})
}

// CurrentState - текущее состояние игры
func (h *GameHistory) CurrentState() *GameState {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.currentState()
}

// run - запуск конкретного события (вызывается из Run)
func (h *GameHistory) run(t uint64, event GameEvent) *GameState {
	previousEl := h.closestPriorHistoryEntry(t)

	// добавление новой записи в историю
	el := h.events.InsertAfter(&GameHistoryEntry{t, nil, event}, previousEl)

	// перезаписываем историю, смещая события
	for el != nil {
		curr := el.Value.(*GameHistoryEntry)
		prev := el.Prev().Value.(*GameHistoryEntry)

		// обновляет последнее состояние, проигрывает физику и т.д
		curr.state = prev.state.Update(curr.time)

		// проигрывает событие
		curr.event.Execute(curr.state)

		// продолжает цикл со следующим элементом
		el = el.Next()
	}

	h.trim()
	return h.currentState()
}

func (h *GameHistory) currentEntry() *GameHistoryEntry {
	return h.events.Back().Value.(*GameHistoryEntry)
}

func (h *GameHistory) currentState() *GameState {
	return h.currentEntry().state
}

// trim - удаляем историю старше 10 секунд
func (h *GameHistory) trim() {
	now := helpers.MakeTimestamp()
	for el := h.events.Front(); el != nil && (now-el.Value.(*GameHistoryEntry).time) > msToKeepHistoryEvents; el = h.events.Front() {
		h.events.Remove(el)
	}
}

// closestPriorHistoryEntry - ищем последнюю запись в истории для записи после
func (h *GameHistory) closestPriorHistoryEntry(t uint64) *list.Element {
	for e := h.events.Back(); e != nil; e = e.Prev() {
		if e.Value.(*GameHistoryEntry).time <= t {
			return e
		}
	}
	return nil
}
