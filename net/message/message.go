package message

import (
	"fmt"

	"github.com/bitly/go-simplejson"
)

// MakeMessage - создание request или response
func MakeMessage(namespace string, json *simplejson.Json) *simplejson.Json {
	str, err := json.Encode()
	if err != nil {
		return MakeBlankMessage(namespace)
	}

	bytes := []byte(fmt.Sprintf(`{"method": %v, "message": %v}`, namespace, string(str)))
	message, err := simplejson.NewJson(bytes)
	if err != nil {
		return MakeBlankMessage(namespace)
	}

	return message
}

// MakeBlankMessage - создание пустого request или response
func MakeBlankMessage(namespace string) *simplejson.Json {
	bytes := []byte(fmt.Sprintf(`["%v", {}]`, namespace))
	json, _ := simplejson.NewJson(bytes)

	return json
}
