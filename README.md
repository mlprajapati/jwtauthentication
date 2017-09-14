# jwtauthentication
This application created to understand how we can secure our application API with token based authentication.

## Features
* Node JS, Express, Typescript base
* cors, body-parser, method-override as url protection
* express-jwt for token creation and router ristriction
* Q for promiss based response
* API Response Logging , Express Server Logging
* APIs 
    - users - list of users (/users)
    - authentication  - Authentication of user based on login credential (username 7 password)
    - API Partial JSON response support 
```
    curl http://localhost:3000/users
```
- Response 
```
{
    "code":500,
    "message":"UnauthorizedError: No authorization token was found."
}
```
    post http://localhost:3000/users/authenticate with json fromat post data {"username":"user2","password":"pass2"}
```
- Response
```
{
    "email": "madanmannu2@gmail.com",
    "name": "Madan2 prajapati2",
    "phoneNumbers": [
        "1111111112",
        "2222222224"
    ],
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMiIsImlhdCI6MTUwNTM4NTU3NX0.UmjKAh4rj2rzG_TKpN4DwjconnJkd2hY0LXO7-qkkqI"
}
```
---
```
    get http://localhost:3000/users 
    After successful authentication you will get token with response data and set token (Mybearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMiIsImlhdCI6MTUwNTM4NTU3NX0.UmjKAh4rj2rzG_TKpN4DwjconnJkd2hY0LXO7-qkkqI) value with request header of each request. then you will able to get success result of user list.
```
- Response
```
[
    {
        "id": 1,
        "username": "user1",
        "password": "pass1",
        "email": "madanmannu@gmail.com",
        "name": {
            "first": "Madan",
            "last": "prajapati"
        },
        "status": "true",
        "phoneNumbers": [
            "1111111111",
            "2222222222"
        ]
    },
    {
        "id": 2,
        "username": "user2",
        "password": "pass2",
        "email": "madanmannu2@gmail.com",
        "name": {
            "first": "Madan2",
            "last": "prajapati2"
        },
        "status": "true",
        "phoneNumbers": [
            "1111111112",
            "2222222224"
        ]
    }
]
```

## Pre-requisites

Install npm and nodeJS

npm version >= 3.xa
node version >= 6.x

```
## Using command prompt change directory with source code git clone or downloaded root path
cd "your application source path."
```
## Install It

```
npm install
```
## Compile and build Run It
```
tsc
```
## Run application
```
node build/server.js
```


### License

MIT




