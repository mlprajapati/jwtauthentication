"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
//generate a port for the host on which application run Ex. for local "http://localhost:3001/" 
var port = normalizePort(process.env.PORT || 3001);
app_1.default.set('port', port);
app_1.default.listen(port, function () {
    console.log("Listening at http://localhost:" + port + "/");
});
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port > 0)
        return port;
    else
        return false;
}
