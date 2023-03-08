import express from "express";
import Category from "../model/category"
import Product from "../model/product"

export const categoryRouter = express.Router();

categoryRouter.get("/",async (req,res)=>{
    try{
        const categories = await Category.find()
        res.status(200).send(categories)
    }catch(error){
        res.status(400).send(error)
    }
})

categoryRouter.get("/:id",async (req,res)=>{
    try{
        const product = await Product.find({categoryID :req.params.id})
        res.status(200).send(product)
        // const match = {categoryID:req.params.id}
        // const categories = await Category.find({_id:req.params.id})
        // const product = await Category.populate({
        //     path:'products',
        //     match
        // })
        // res.status(200).send(product)
    }catch(error){
        res.status(400).send(error.message)
    }
})
