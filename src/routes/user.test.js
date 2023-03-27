import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
require("../db/mongoose");
import User from "../model/user";

describe("Unit test cases for User", () => {
  beforeAll(async () => {
    await User.deleteOne({
      fname: "Test",
      lname: "Test1",
      email: "test@gmail.com",
    });
  });

  test("Test 1: New User sign-up", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        fname: "Test",
        lname: "Test1",
        email: "test@gmail.com",
        password: "Test@123",
        mobileno: 1212121212,
        addressline1: "AAA",
        addressline2: "XYZ Street",
        city: "Waterloo",
        province: "Ontario",
        country: "Canada",
        pincode: "PPP PPP",
      })
      .expect(201);

    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();
  });

  test("Test 2: Sign-up not allowed for existing user", async () => {
    const response = await request(app)
      .post("/auth/signup")
      .send({
        fname: "Test",
        lname: "Test1",
        email: "test@gmail.com",
        password: "Test@123",
        mobileno: 1212121212,
        addressline1: "AAA",
        addressline2: "XYZ Street",
        city: "Waterloo",
        province: "Ontario",
        country: "Canada",
        pincode: "PPP PPP",
      })
      .expect(400);
  });

  test("Test 3: User should login", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test@gmail.com",
        password: "Test@123",
      })
      .expect(200);
  });

  test("Test 4: Login not allowed for incorrect credentials", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test123@gmail.com",
        password: "Test123@123",
      })
      .expect(400);
  });

  test("Test 5: Logout functionality", async () => {
    const user = await User.find({ email: "test@gmail.com" });
    const response = await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${user[0].tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Test 6: User should not logout without login", async () => {
    mongoose.connection.close();
    const response = await request(app)
      .post("/auth/logout")
      .set("Authorization", "Bearer faketoken")
      .send()
      .expect(401);
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
}, 30000);
