"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var userService_1 = require("../services/userService");
var router = express_1.Router();
var UserController = /** @class */ (function () {
    function UserController() {
        this.router = express_1.Router();
        this.init();
    }
    UserController.prototype.authenticate = function (req, res) {
        var userService = new userService_1.UserService();
        userService.authenticate(req.body.username, req.body.password)
            .then(function (user) {
            console.log("result ", user);
            if (user) {
                res.send(user);
            }
            else {
                res.status(400).send('Username or password is incorrect');
            }
        })
            .catch(function (err) {
            res.status(400).send(err);
        });
    };
    UserController.prototype.getUser = function (req, res) {
        var userService = new userService_1.UserService();
        userService.getUser()
            .then(function (users) {
            if (users) {
                res.send(users);
            }
            else {
                res.status(400).send('No User');
            }
        })
            .catch(function (err) {
            res.status(400).send(err);
        });
    };
    UserController.prototype.init = function () {
        this.router.post('/authenticate', this.authenticate);
        this.router.get('/', this.getUser);
    };
    return UserController;
}());
exports.UserController = UserController;
var userController = new UserController();
userController.init();
exports.default = userController.router;
