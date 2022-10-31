const request = require("supertest");
const { Genre } = require("../../models/genre");
const { User } = require("../../models/user");
const mongoose = require("mongoose");
let server;
// integration test
describe("/api/genres", () => {
  // close server between test
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.remove({});
  });

  // test suite 1
  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      // assert that we want at least 2 items
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });
  // test suite 2
  describe("GET /:id", () => {
    it("should return genre with valid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/" + genre._id);
      expect(res.status).toBe(200);
      expect(res.body).toMatchProperty("name", genre.name);
    });

    it("should return 404 if invalid id is passed", async () => {
      const genre = new Genre({ name: "genre1" });
      await genre.save();

      const res = await request(server).get("/api/genres/1" + genre._id);

      expect(res.status).toBe(404);
      expect(res.body).toMatchProperty("name", genre.name);
    });
  });
  describe("POST /", () => {
    it("should return 401 if client is not logged in", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });
      expect(res.status).toBe(401);
    });
    // 400 = bad request
    it("should return 400 if client is less than 5 characters", async () => {
      const token = new User().generateAuthToken();
      const name = new Array(52).join('a');
      const res = await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name: name });
      expect(res.status).toBe(400);
    });
  });
});
