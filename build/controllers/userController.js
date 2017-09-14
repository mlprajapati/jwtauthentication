"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userService_1 = require("../services/userService");
const router = express_1.Router();
class UserController {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    authenticate(req, res) {
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
    }
    getUser(req, res) {
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
    }
    init() {
        this.router.post('/authenticate', this.authenticate);
        this.router.get('/', this.getUser);
    }
}
exports.UserController = UserController;
const userController = new UserController();
userController.init();
exports.default = userController.router;
