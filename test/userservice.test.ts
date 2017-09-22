import * as supertest from "supertest";
import {User, Name} from '../app/model/user';
import config from '../app/config';
import {UserService} from "../app/services/userService";

describe("Get user list", () => {
  let objUserService:UserService;
  beforeEach(() => {
    objUserService = new UserService();
  })
  it('should return resolve', () => {
   
      expect(objUserService.authenticate('user1','pass1')).resolves;
     
   });
  
  it('should match input in array list for successful authentication and return details with token', () => {
    return objUserService.authenticate('user1','pass1').then((data:any) =>{
      expect(data).not.toBeUndefined();
      expect(data).not.toBeNull();
      expect(data.email).toEqual("abcd1@gmail.com");
      expect(data.token).not.toBeUndefined();
     });
   });
   it('should not match input in array list and fail authentication', () => {
    return objUserService.authenticate('user12','pass1').then((data:any) =>{
      expect(data).toBeUndefined();
     });
   });

   it('should return user list with data', () => {
    return objUserService.getUsers().then((data:any) =>{
     expect(data.length).toEqual(2);
     expect(data).toEqual([{"email": "abcd1@gmail.com", "id": 1, "name": {"first": "User 1", "last": "Surname 1"}, "password": "pass1", "phoneNumbers": ["1111111111", "2222222222"], "status": "true", "username": "user1"}, {"email": "abcd2@gmail.com", "id": 2, "name": {"first": "User 2", "last": "Surname 2"}, "password": "pass2", "phoneNumbers": ["1111111112", "2222222224"], "status": "true", "username": "user2"}]);
     });
   });
});