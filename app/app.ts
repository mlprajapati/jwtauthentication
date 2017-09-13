import * as express from 'express';
import config from './config';
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
// Import WelcomeController from controllers entry point
import UserController from './controllers/userController';
class App{
    // Create a new express application instance
    public app:express.Application;
    constructor(){
        this.app = express();    
        this.middleware();
        this.routes();
    }

    private middleware(): void{
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }

    private routes(): void{
        let router = express.Router();
        this.app.use(expressJwt({
            secret: config.secret,
            getToken: function (req:any) {
                console.log("req.headers.authorization ",req.headers.authorization)
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'MyBearer') {
                    return req.headers.authorization.split(' ')[1];
                } else if (req.query && req.query.token) {
                    return req.query.token;
                }
                return null;
            }
        }).unless({ path: ['/users/authenticate'] }));
        this.app.use('/users', UserController);
    }


}
export default new App().app;