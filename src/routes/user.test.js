import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
require("../db/mongoose");
import User from "../model/user";

describe("User unit test cases", () => {
  beforeAll(async () => {
    await User.deleteOne({
      fname: "Test",
      lname: "Test1",
      email: "test@gmail.com",
    });
  });

  test("Should sign up New User!", async () => {
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

  test("Try to add already exist User!", async () => {
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

  test("User should login", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test@gmail.com",
        password: "Test@123",
      })
      .expect(200);
  });

  test("User should not login for wrong credentials", async () => {
    const response = await request(app)
      .post("/auth/login")
      .send({
        email: "test123@gmail.com",
        password: "Test123@123",
      })
      .expect(400);
  });

  test("Loged in user should get profile", async () => {
    const user = await User.find({ email: "test@gmail.com" });
    await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${user[0].tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("Loged in user should update profile", async () => {
    const user = await User.find({ email: "test@gmail.com" });
    await request(app)
      .patch("/auth/profile")
      .set("Authorization", `Bearer ${user[0].tokens[0].token}`)
      .send({
        fname: "Test",
        lname: "Test1",
        mobileno: 1212121212,
        addressline1: "UAAA",
        addressline2: "UXYZ Street",
        city: "UWaterloo",
        province: "UOntario",
        country: "UCanada",
        pincode: "UPPP PPP"
      })
      .expect(200);
  });

  test("Loged in user should not update profile", async () => {
    const user = await User.find({ email: "test@gmail.com" });
    await request(app)
      .patch("/auth/profile")
      .set("Authorization", `Bearer ${user[0].tokens[0].token}`)
      .send({
        otp:"122"
      })
      .expect(400);
  });


  test("Unauthorized user should not get profile", async () => {
    const user = await User.find({ email: "test@gmail.com" });
    await request(app)
      .get("/auth/profile")
      .set("Authorization", 'Bearer faketoken')
      .send()
      .expect(401);
  });



  test("User should logout", async () => {
    const user = await User.find({ email: "test@gmail.com" });
    const response = await request(app)
      .post("/auth/logout")
      .set("Authorization", `Bearer ${user[0].tokens[0].token}`)
      .send()
      .expect(200);
  });

  test("User shouldnot logout without login", async () => {
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
},30000);
