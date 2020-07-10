const request = require("supertest");
const { Flavour } = require("../../models/flavour");
const { User } = require("../../models/user");
const mongoose = require("mongoose");

let server;

describe("/api/flavours", () => {
  // Close the server and re-open it so you dont get an error
  beforeEach(() => {
    server = require("../../index");
  });
  afterEach(async () => {
    await Flavour.deleteMany({});
    await server.close();
  });
  describe("GET /", () => {
    it("should return all flavours", async () => {
      await Flavour.collection.insertMany([
        { name: "flavour1" },
        { name: "flavour2" },
      ]);
      const res = await request(server).get("/api/flavours");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((f) => f.name === "flavour1")).toBeTruthy();
      expect(res.body.some((f) => f.name === "flavour2")).toBeTruthy();
    });
  });
  describe("GET /:id", () => {
    it("should return a single flavour", async () => {
      const flavour = new Flavour({ name: "flavour1" });
      await flavour.save();
      const res = await request(server).get(`/api/flavours/${flavour._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", flavour.name);
    });
    it("should return 404 if invalid id is passed", async () => {
      const res = await request(server).get("/api/flavours/1");
      expect(res.status).toBe(404);
    });
    it("should return 404 if no flavour with the ID exists", async () => {
      const id = mongoose.Types.ObjectId();
      const res = await request(server).get(`/api/flavours/${id}`);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    // Define the happy path, and then in each test, we change one parameter
    //that clearly aligns with the name of the test.
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/flavours")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "flavour1";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it("should return 400 if flavour is less than 5 characters", async () => {
      name = "1234";

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should return 400 if flavour is more than 50 characters", async () => {
      name = new Array(52).join("a");

      const res = await exec();

      expect(res.status).toBe(400);
    });
    it("should save the flavour if it is valid", async () => {
      await exec();

      const flavour = Flavour.find({ name: "flavour1" });

      expect(flavour).not.toBeNull();
    });
    it("should return if the flavour if valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "flavour1");
    });
  });
});
