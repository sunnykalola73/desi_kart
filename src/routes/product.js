import express from "express";
import Product from "../model/product"

export const productRouter = express.Router();

productRouter.get("/:id",async (req,res)=>{
    try{
        const product = await Product.find({_id :req.params.id})
        res.status(200).send(product)
    }catch(error){
        res.status(400).send(error.message)
    }
})



