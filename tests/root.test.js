const request = require('supertest');
const app = require('../app');

let agent = request.agent(app);

agent
    .post('/signin')
    .send({
        email: "mahe@gmail.com",
        password: "123456"
    })

describe("GET /", ()=>{
    test("should return objects of message : root",async ()=>{
        const response = await agent.get("/");
        expect(response.body).toEqual({message: 'root'});
        expect(response.statusCode).toBe(200);
    })
});

describe("POST /signin", ()=>{
    test("should return objects of users",async ()=>{
        const response = await agent.post("/signin").send({
            email: "mahe@gmail.com",
            password: "123456"
        })
        expect(response.statusCode).toBe(302);
    })
})

describe("POST /signup", ()=>{
    test("should return objects of users",async ()=>{
        const response = await agent.post("/signup").send({
            email: "mahe123@gmail.com",
            password: "123456"
        })
        expect(response.statusCode).toBe(302);
    })
})

describe("POST /logout", ()=>{
    test("should return objects of users",async ()=>{
        const response = await agent.post("/logout")
        expect(response.statusCode).toBe(302);
    })
})

