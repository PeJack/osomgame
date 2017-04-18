"use strict";
exports.__esModule = true;
var MainApp = (function () {
    function MainApp(data) {
        this.dataModifer = 'works';
        this.dataModifer += data;
    }
    MainApp.prototype.showData = function (data) {
        if (data === void 0) { data = this.dataModifer; }
        var newData = this.dataModifer.toUpperCase();
        return newData;
    };
    return MainApp;
}());
exports.MainApp = MainApp;
