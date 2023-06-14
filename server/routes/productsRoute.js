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
        
        const products = await Product.find().sort({createdAt : -1});
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


// edit a product

router.put("/edit-product/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await Product.findByIdAndUpdate(req.params.id , req.body);
        res.send({
            success : true,
            message : "Product Updated successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
});

//delete a product

router.delete("/delete-product/:id" , authMiddleware , async(req,res)=>{
    try {
        
        await Product.findByIdAndDelete(req.params.id);
        res.send({
            success : true,
            message : "Product Deleted successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message : error.message
        });
    }
})


module.exports = router;