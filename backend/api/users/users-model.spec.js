const Users = require("./users-model");
const db = require("../../database/db-config");

beforeAll(async () => {
  await db.raw("TRUNCATE TABLE users CASCADE");
});

describe("User model", () => {
  describe("insert function", () => {
    let users;
    test("should insert user", async () => {
      await Users.add({
        date_of_birth: new Date("2000-05-22").toISOString(),
        password: "math",
        email: "testing2@gmail.com",
      });

      users = await db("users");
      expect(users).toHaveLength(1);

      await Users.add({
        date_of_birth: new Date("2000-05-22").toISOString(),
        password: "tech",
        email: "test@gmail.com",
      });

      users = await db("users");
      expect(users).toHaveLength(2);
    });
  });
  describe("find function", () => {
    let users;
    test("should find user without password", async () => {
      const user = {
        date_of_birth: new Date("2000-05-22").toISOString(),
        password: "math",
        email: "testing3@gmail.com",
      };
      await Users.add(user);

      const user_detail = await Users.findByEmail(user.email);

      const { id, created_at, updated_at, date_of_birth, ...user_match } =
        user_detail;

      expect(user_match).toEqual({
        password: "math",
        email: "testing3@gmail.com",
      });
    });
  });
});
