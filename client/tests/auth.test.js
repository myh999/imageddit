const request = require("supertest");
const app = require("../src/app");

jest.mock("../src/db/users");

const users = require("../src/db/users");

describe("auth", () => {
    test("should create users", async () => {
        const userName = "test3";
        const password = "pass3";
        users.createUser.mockResolvedValue(userName);
        await request(app)
            .post("/user")
            .send("userName=" + userName)
            .send("password=" + password)
            .expect(200);;
        expect(users.createUser.mock.calls.length).toBe(1);
        expect(users.createUser.mock.calls[0][0]).toBe(userName);
        expect(users.createUser.mock.calls[0][1]).toBe(password);
    });
});
