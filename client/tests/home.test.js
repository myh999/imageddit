jest.mock("../src/db/posts");

const posts = require("../src/db/posts");
const home = require("../src/controllers/home");

describe("home", () => {
    test("searches for users", async () => {
        const renderTestFn = jest.fn();
        const q = "test";
        const qResult = ["test1", "test2"];
        const req = {
            query: {
                q
            }
        }
        const res = {
            render: renderTestFn
        }

        posts.searchPosts.mockResolvedValue(qResult);
        await home.getHome(req, res);
        expect(posts.searchPosts.mock.calls.length).toBe(1);
        expect(posts.searchPosts.mock.calls.length).toBe(1);
        expect(posts.searchPosts.mock.calls[0][0]).toBe(q);
        expect(renderTestFn.mock.calls[0][1].searchResults).toBe(qResult);
    });
});
