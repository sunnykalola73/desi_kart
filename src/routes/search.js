import express from "express";
import Category from "../model/category"
import Product from "../model/product"
export const searchRouter = express.Router();

searchRouter.get("/", async (req, res) => {
    try {
        const searchQuery = req.body
        const response = []

        const category = await Category.find({ cname: { $regex: searchQuery.search } });

        const products = []
        if (category.length > 0) {
            const prods = await Product.find({ categoryID: category[0]._id })
            products.push(prods)
        } else {
            const prods = await Product.find({ $or: [{ pname: { $regex: searchQuery.search } }, { description: { $regex: searchQuery.search } }] })
            products.push(prods)
        }
        response.push({ "Products": products })

        res.status(200).send(response)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

