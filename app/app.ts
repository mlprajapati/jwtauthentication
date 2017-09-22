import * as express from 'express';
import config from './config';
var cors = require('cors');
var bodyParser = require('body-parser');
var expressJwt = require('express-jwt');
// Import UserController from controllers entry point
import UserController from './controllers/userController';
import ProductController from './controllers/productController';
class App{
    // declaring a new express application variable
    public app:express.Application;
    constructor(){
        // Creating a new express application instance
        this.app = express();    
        this.middleware();
        this.routes();
        this.app.use(function (err:any, req:any, res:any, next:any) {
            res.status(400).json({code:500,message:'UnauthorizedError: No authorization token was found.' , err});
          })
    }
    //This methos sets the pre exicutive setting for api url
    private middleware(): void{
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
    }
    // Validate the all routes request if it pass the token then it allow to response data otherwise throw error. 
    private routes(): void{
        let router = express.Router();
        this.app.use(expressJwt({
            secret: config.secret,
            getToken: function (req:any) {
                if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'MyBearer') {
                    return req.headers.authorization.split(' ')[1];
                } else if (req.query && req.query.token) {
                    return req.query.token;
                }
                return null;
            }
        }).unless({ path: ['/users/authenticate','/products'] }));
        //Api end points
        this.app.use('/users', UserController);
        this.app.use('/products', ProductController);
    }


}
export default new App().app;