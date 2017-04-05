export class Backend{
    constructor (ws) {
        this.ws = ws;
        this.callbacks = [];

        this.ws.onopen = function () {
            self.onOpen();
            console.log("connected to " + wsurl);
        };

        this.ws.onclose = function (e) {
            self.onClose();
            console.log("network closed (" + e.code + ")");
        };

        this.ws.onmessage = function (e) {
            let data = JSON.parse(e.data);
            self.process(data);
            console.log("message received: " + e.data);
        }
    }

    onOpen() {
    };

    onClose() {
    };

    send(method, entityType, entity) {
        let request = {
            method: method
        };

        request[entityType] = entity;
        jsonRequest = JSON.stringify(request);
        console.log("Request: ", jsonRequest);
        this.ws.send(jsonRequest);
    };

    register(method, callback) {
        this.callbacks[method] = callback;
    };

    process(data) {
        this.callbacks[data.Method](data)
    };
}