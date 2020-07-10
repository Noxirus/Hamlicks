const { User } = require("../../../models/user");
const auth = require("../../../middleware/auth");
const mongoose = require("mongoose");

//TODO it looks like the port that the server is listening on isnt always closing properly leading to errors when the tests are run again
describe("auth middleware", () => {
  it("should populate req.user with the payload of a valid JWT", () => {
    const user = {
      _id: mongoose.Types.ObjectId().toHexString(),
      isAdmin: true,
    };
    const token = new User(user).generateAuthToken();
    const req = {
      header: jest.fn().mockReturnValue(token),
    };
    const res = {};
    const next = jest.fn();
    auth(req, res, next);

    expect(req.user).toMatchObject(user);
  });
});
