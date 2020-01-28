const { User } = require("../../models/userModel");
const { Genre } = require("../../models/genreModel");
const request = require("supertest");

describe("auth middleware", () => {
  let server;
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    await Genre.remove({});
    await server.close(); 
  });

  let token;

  beforeEach(() => {
    token = new User().generateAuthToken();
  });
  const exec = () => {
    return request(server)
      .post("/api/film/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  it("should return 401 if no token is provided", async () => {
    token = "";
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it("should return 400 if token is invalid", async () => {
    token = "a";
    const res = await exec();
    expect(res.status).toBe(400);
  });

  it("should return 200 if token is valid", async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});
