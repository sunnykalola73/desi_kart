import express from "express";
import Category from "../model/category"
import Product from "../model/product"
export const searchRouter = express.Router();

searchRouter.get("/:search", async (req, res) => {
    try {
        const searchQuery = req.params.search
        if (searchQuery !== "") {
            const response = []

            const category = await Category.find({ cname: { $regex: searchQuery, $options: 'i' } });

            if (category.length > 0) {
                const prods = await Product.find({ categoryID: category[0]._id })
                response.push(prods)
            } else {
                const prods = await Product.find({ $or: [{ pname: { $regex: searchQuery, $options: 'i' } }, { description: { $regex: searchQuery, $options: 'i' } }] })
                response.push(prods)
            }
            res.status(200).send(response)
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

