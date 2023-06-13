const router = require('express').Router();
const Product = require("../models/productModel");
const authMiddleware = require("../middlewares/authMiddleware");

//add a new product

router.post("/add-product" , authMiddleware , async(req,res)=>{
    try {
        
        const newProduct = new Product(req.body)
        await newProduct.save();
        res.send({
            success : true,
            message : "Product Added Sucessfully"
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

//get all products

router.post("/get-products" , authMiddleware , async(req,res)=>{
    try {
        
        const products = await Product.find();
        res.send({
            success : true,
            products,
        })

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
})

module.exports = router;