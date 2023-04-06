import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
require("../db/mongoose");

describe("Unit test cases for Search", () => {
    test("Test 1: Get all categories and products as per search query.", async () => {
  
      const response = await request(app)
        .get("/search/")
        .send({ search: 'Personal' })
        .expect(200);
    });
  
    test("Test 2: Search query is missing", async () => {
  
        const response = await request(app)
          .get("/search/")
          .expect(404);
      });
    
    afterAll((done) => {
      mongoose.connection.close();
      done();
    });
  },30000);
  