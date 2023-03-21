import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
require("../db/mongoose");


describe("Unit test cases for Product", () => {
  test("Test 1: Get product by id where id exist", async () => {
    const response = await request(app)
      .get("/products/64095599a46409eff6e3969a")
      .send()
      .expect(200);
  });

  test("Test 2: Get product by id where id doesnot exist!", async () => {
    const response = await request(app)
      .get("/products/invalid-id")
      .send()
      .expect(400);
  });
}, 30000);
