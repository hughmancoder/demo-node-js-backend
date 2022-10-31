const { describe } = require("joi/lib/types/lazy");
const request = require("supertest");
const { User } = require('../../models/user')
// test middleware and route handlers
describe("auth middleware", () => {
  beforeEach(() => { server = require("../../index"); });
  afterEach(async () => {server.close(); });
  let token;
  const exec = () => {
    return request(server).post('/api/genres').set('x-auth-token', token).send({ name: 'genre1' });
  }
  it("should return 401 if token is invalid", async() => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  }); 
});
