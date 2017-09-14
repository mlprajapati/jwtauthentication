"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var config_1 = require("./config");
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
// Import UserController from controllers entry point
var userController_1 = require("./controllers/userController");
var App = /** @class */ (function () {
    function App() {
        // Creating a new express application instance
        this.app = express();
        this.middleware();
        this.routes();
    }
    //This methos sets the pre exicutive setting for api url
    App.prototype.middleware = function () {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    };
    // Validate the all routes request if it pass the token then it allow to response data otherwise throw error. 
    App.prototype.routes = function () {
        var router = express.Router();
        this.app.use(expressJwt({
            secret: config_1.default.secret,
            getToken: function (req) {
                console.log("req.headers.authorization ", req.headers.authorization);
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'MyBearer') {
                    return req.headers.authorization.split(' ')[1];
                }
                else if (req.query && req.query.token) {
                    return req.query.token;
                }
                return null;
            }
        }).unless({ path: ['/users/authenticate'] }));
        //Api end points
        this.app.use('/users', userController_1.default);
    };
    return App;
}());
exports.default = new App().app;
