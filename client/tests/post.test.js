jest.mock("../src/db/posts");

const posts = require("../src/db/posts");
const post = require("../src/controllers/post");

describe("post", () => {
    test("gets a post", async () => {
        const renderTestFn = jest.fn();
        const postID = "testPost";
        const postInfo = {
            postID
        }
        const comments = ["test1", "test2"];
        const req = {
            params: {
                postID
            }
        };
        const res = {
            render: renderTestFn
        };

        posts.getPostByID.mockResolvedValue(postInfo);
        posts.getCommentsByPost.mockResolvedValue(comments);
        await post.getPost(req, res);
        expect(posts.getPostByID.mock.calls[0][0]).toBe(postID);
        expect(posts.getCommentsByPost.mock.calls[0][0]).toBe(postID);
        expect(renderTestFn.mock.calls[0][1].post).toBe(postInfo);
        expect(renderTestFn.mock.calls[0][1].comments).toBe(comments);
    });

    test("creates a post", async () => {
        const redirectTestFn = jest.fn();
        const req = {
            body: {
                title: "testTitle",
            },
            file: {
                filename: "testFilename"
            },
            user: {
                userName: "testUser"
            }
        };
        const res = {
            redirect: redirectTestFn
        };

        posts.createPost.mockResolvedValue(true);
        await post.postPost(req, res);
        expect(posts.createPost.mock.calls[0][0]).toBe(req.body.title);
        expect(posts.createPost.mock.calls[0][1]).toBe(req.file.filename);
        expect(posts.createPost.mock.calls[0][2]).toBe(req.user.userName);
    });

    test("creates a comment", async () => {
        const redirectTestFn = jest.fn();
        const req = {
            params: {
                postID: "testPost"
            },
            body: {
                description: "testDesc"
            },
            user: {
                userName: "testUser"
            }
        };
        const res = {
            redirect: redirectTestFn
        };

        posts.createComment.mockResolvedValue(true);
        await post.postComment(req, res);
        expect(posts.createComment.mock.calls[0][0]).toBe(req.params.postID);
        expect(posts.createComment.mock.calls[0][1]).toBe(req.user.userName);
        expect(posts.createComment.mock.calls[0][2]).toBe(req.body.description);
    });
});
