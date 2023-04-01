import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import Category from "../model/category";
require("../db/mongoose");

describe("Unit test cases for Category", () => {
  test("Test 1: Get all categories", async () => {

    const response = await request(app)
      .get("/categories/")
      .send()
      .expect(200);
  });

  test("Test 2: Get all categories", async () => {
    
    Category.find = jest.fn().mockRejectedValue(new Error('Database error'));
    const response = await request(app)
      .get("/categories/")
      .send()
      .expect(400);
  });

  test("Test 3: Get category's products by id where id exists!", async () => {
    const response = await request(app)
      .get("/categories/6408bfd9a46409eff698615f")
      .send()
      .expect(200);
  });

  test("Test 4: Get category's products by id where id doesnot exist!", async () => {
    const response = await request(app)
      .get("/categories/invalid-id")
      .send()
      .expect(400);
  });

  afterAll((done) => {
    mongoose.connection.close();
    done();
  });
},30000);
