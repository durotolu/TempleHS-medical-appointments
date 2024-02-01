const request = require("supertest");
const server = require("../server");
const db = require("../../database/db-config");

beforeAll(async () => {
  await db.raw("TRUNCATE TABLE users CASCADE");
});

let token;

const input = {
  date_of_birth: new Date("2000-05-22").toISOString(),
  password: "testing",
  email: "testing@gmail.com",
};

describe("users authorization", () => {
  describe("POST user register and login", () => {
    test("should return 201, with testing as user", () => {
      return request(server)
        .post("/api/auth/register")
        .send(input)
        .set("Accept", "application/json")
        .expect(201)
        .then((res) => {
          res.body.username, "testing";
        });
    });

    test("should return 200, with testing as user and correct content-type", async () => {
      const { date_of_birth, ...loginInput } = input;
      const response = await request(server)
        .post("/api/auth/login")
        .send(loginInput)
        .set("Accept", "application/json")
        .expect(200);

      token = response.body.token;
    });

    test("should return 401 for unregistered user", async () => {
      const { date_of_birth, ...loginInput } = input;
      const response = await request(server)
        .post("/api/auth/login")
        .send({
          date_of_birth: new Date("2000-05-22").toISOString(),
          password: "testing",
          email: "unregisteredg@gmail.com",
        })
        .set("Accept", "application/json")
        .expect(401);

      token = response.body.token;
    });
  });
});
