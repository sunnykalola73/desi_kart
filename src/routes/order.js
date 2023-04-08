import express from "express";
import Order from "../model/order";
import auth from "../middleware/auth";
import stripHandler from "../middleware/striphandle";

export const orderRouter = express.Router();

orderRouter.post("/place-order", auth, stripHandler, async (req, res) => {
  try {
    if (req.createCharges.status === "succeeded") {
      const order = new Order(req.body);
      order.userID = req.user._id;
      order.transaction_ID = req.createCharges.balance_transaction;

      await order.save();
      res.status(201).send(order);
    } else {
      res.status(400).send("Opps! Transaction Failed!");
    }
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
