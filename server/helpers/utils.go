package helpers

import (
	"math/rand"
	"time"

	"github.com/lucasb-eyer/go-colorful"
)

// MakeTimestamp - создание таймстампа
func MakeTimestamp() uint64 {
	return uint64(time.Now().UnixNano() / int64(time.Millisecond))
}

// RandomColor - выбор случайного цвета
func RandomColor() string {
	c := colorful.Hcl(rand.Float64()*360.0, rand.Float64(), 0.8+rand.Float64()*0.2)
	return c.Hex()
}

// Random - случайное целочисленное число между двумя числами
func Random(min int, max int) int {
	d := max - min + 1
	return min + rand.Intn(d)
}

// RandomFloat - случайное число с плавающей точкой между двумя числами
func RandomFloat(min float64, max float64) float64 {
	d := max - min + 1
	return min + rand.Float64()*d
}

// RandomAngle - случайный наклон
func RandomAngle() float64 {
	return float64(Random(0, 359))
}
