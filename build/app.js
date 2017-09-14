"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const config_1 = require("./config");
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
// Import UserController from controllers entry point
const userController_1 = require("./controllers/userController");
class App {
    constructor() {
        // Creating a new express application instance
        this.app = express();
        this.middleware();
        this.routes();
        this.app.use(function (err, req, res, next) {
            res.status(400).json({ code: 500, message: 'UnauthorizedError: No authorization token was found.' });
        });
    }
    //This methos sets the pre exicutive setting for api url
    middleware() {
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    // Validate the all routes request if it pass the token then it allow to response data otherwise throw error. 
    routes() {
        let router = express.Router();
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
    }
}
exports.default = new App().app;
