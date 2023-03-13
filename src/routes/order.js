import express from "express";
import Order from "../model/order";
import auth from "../middleware/auth";

export const orderRouter = express.Router();

orderRouter.post("/place-order", auth, async (req, res) => {
  try {
    const order = new Order(req.body);
    order.userID = req.user._id;

    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

orderRouter.get("/get-all-orders", auth, async (req, res) => {
  try {
    console.log(req.user._id);
    const orders = await Order.find({ userID: req.user._id });
    res.status(201).send(orders);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
