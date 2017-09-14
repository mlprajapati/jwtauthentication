import {User, Name} from '../model/user';
import config from '../config';
var jwt = require('jsonwebtoken');
var Q = require('q');

export class UserService {
    private userList:Array<User> = [];
    constructor() {
       this.userList.push({id: 1,username:'user1',password:'pass1', email: 'madanmannu@gmail.com',name: {first:'Madan',last:'prajapati'},status: 'true',phoneNumbers: ['1111111111','2222222222']});
       this.userList.push({id: 2,username:'user2',password:'pass2', email: 'madanmannu2@gmail.com',name: {first:'Madan2',last:'prajapati2'},status: 'true',phoneNumbers: ['1111111112','2222222224']});
      }
    
 
    public authenticate(username:string, password:string) {
        var deferred = Q.defer();
        let users:User[] = this.userList.filter(function(user:any){
            return (user.username === username);
        });
        let objUser:User = users[0]
        if(objUser && objUser.password === password){
            deferred.resolve( {email: objUser.email,name: objUser.name.first +' '+ objUser.name.last,phoneNumbers: objUser.phoneNumbers,token: jwt.sign({ sub: objUser.username }, config.secret)});
        } else {
            deferred.resolve();
        }
        return deferred.promise;
    }
    public getUser():any{
        var deferred = Q.defer();
        if(this.userList){
            deferred.resolve(this.userList);
        } else {
            deferred.resolve()
        }
        return deferred.promise;
    }

}