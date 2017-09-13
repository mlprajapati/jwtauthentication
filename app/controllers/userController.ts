import { Router, Request, Response,NextFunction} from 'express';
import {UserService} from '../services/userService';
const router: Router = Router();

export class UserController {
    router:Router;
    constructor() {
        this.router = Router();
        this.init();
      }
      public authenticate(req:Request, res:Response) {
        
        var userService = new UserService();
        userService.authenticate(req.body.username, req.body.password)
            .then(function (user:any) {
                console.log("result ",user)
                if (user) {
                    res.send(user);
                } else {
                    res.status(400).send('Username or password is incorrect');
                }
            })
            .catch(function (err:any) {
                res.status(400).send(err);
            });
    }
    public getUser(req:Request, res:Response){
        var userService = new UserService();
        userService.getUser()
        .then(function(users:any){
            if (users) {
                res.send(users);
            } else {
                res.status(400).send('No User');
            }
        })
        .catch(function(err:any){
            res.status(400).send(err);
        });
    }
      init() {
        this.router.post('/authenticate', this.authenticate);
        this.router.get('/', this.getUser);
      }
    
}
const userController = new UserController();
userController.init();

export default userController.router;
