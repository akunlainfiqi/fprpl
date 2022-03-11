const request = require('supertest');
const app = require('../app');

let agent = request.agent(app);

agent
    .post('/signin')
    .send({
        email: "mahe@gmail.com",
        password: "123456"
    })

describe("GET /users", ()=>{
    test("should return objects of message : users",async ()=>{
        const response = await agent.get("/users/");
        expect(response.body).toEqual({message: 'users'});
        expect(response.statusCode).toBe(200);
    })
});

describe("GET /users/profile", ()=>{
    test("should return objects of users",async ()=>{
        const response = await agent.get("/users/profile")
        expect(response.statusCode).toBe(200);
    })
})

describe("GET /users/profile/id", ()=>{
    test("should return objects of users",async ()=>{
        const response = await agent.get("/users/profile/62264c7120c323de1fd5a61b")
        expect(response.statusCode).toBe(200);
    })
})