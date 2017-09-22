import * as supertest from "supertest";
import {default as app} from "../app/app";
const request = supertest("http://localhost:3001");
var user = {username: 'user1',password:'pass1'};
var userIncorrect = {username: 'user11',password:'pass1'};
describe("GET /users", () => {
  test("should return 200 OK", (done) => {
    request
      .get("/users").then((response)=>{
        expect(response.status).toBe(400);
        done();
      });
  });
});
describe("POST /Authenticate", () => {
  test("should return 200 OK", () => {
    request
      .post("/users/authenticate")
      .expect(200);
  });
});
describe("POST /Authenticate with username and password", () => {
  test("should return 200 OK", (done) => {  
    request
      .post("/users/authenticate")
      .send(user)
      .set('Accept', 'application/json').then(res=>{
        expect(res.type).toEqual('application/json');
        done();
      })     
  });

test("should return json data with token ", (done) => {  
    request
      .post("/users/authenticate")
      .send(user)
      .then(res => {
        //console.log(res);
        expect(res.body).not.toBeUndefined();     
        expect(res.body.token).not.toBeUndefined();
        done();
      });
});
 test("should return message if credential is incorrect ", (done) => {  
    request
      .post("/users/authenticate")
      .send(userIncorrect)
      .then(res => {   
        expect(res.status).toEqual(400);
        expect(res.text).toContain("Username or password is incorrect");
        done();
      });
  });
}); 