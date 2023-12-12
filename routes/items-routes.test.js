process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let popsicle = { name: "popsicle", price: '1.75' };

beforeEach(function() {
    items.push(popsicle);
});

afterEach(function() {
    items.length = 0;
});

describe('GET /items', function() {
    test('Gets a list of items', async function() {
        const resp = await request(app).get('/items');
        expect(resp.statusCode).toBe(200);

        expect(resp.body).toEqual({items: [popsicle]});
    })
})

describe('POST /items', function() {
    test('Add a new item', async function() {
        const resp = await request(app)
        .post('/items')
        .send({
            name: "Cheerios",
            price: "3.40"
        })
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
        item: { name: 'Cheerios', price: '3.40'}
    })
    })
    test ('Responds with 400 if name is missing', async function() {
        const resp = await request(app)
            .post('/items')
            .send({});
        expect(resp.statusCode).toBe(400);
    });
});