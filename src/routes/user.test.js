import request  from 'supertest'
import app from '../app'
import mongoose from 'mongoose'
require('../db/mongoose')
import User from '../model/user'

beforeEach(async ()=>{
  await User.deleteOne({fname:"Test",lname:"Test1",email:"test@gmail.com"})
})
test('Should sign up New User!', async ()=>{
  const response =await request(app).post('/auth/signup').send({
    fname:"Test",
    lname:"Test1",
    email:"test@gmail.com",
    password:"Test@123",
    mobileno:1212121212,
    addressline1:"AAA",
    addressline2:"XYZ Street",
    city:"Waterloo",
    province:"Ontario",
    country:"Canada",
    pincode:"PPP PPP"
  }).expect(201)

  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

})

test('User should login', async ()=>{
  const response = await request(app).post('/auth/login').send({
    email:"sunny@gmail.com",
    password:"Sunny@123"
  }).expect(200)

})

afterAll(done => {
  mongoose.connection.close()
  done()
})

