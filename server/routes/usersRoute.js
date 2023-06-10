const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// new registration
router.post("/register", async (req, res) => {
    try {

        // Check if user already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) {

            throw new Error("user Already exists");

            // we can use both , i.e above throw and below return method to show error 

            // return res.send({
            //     success : false,
            //     message : "User already exists"
            // })
        }

        // hash password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword;

        // create and saving user

        console.log("before creating")
        const newUser = new User(req.body);
        await newUser.save();

        res.send({
            success: true,
            message: "User Created Successfully",
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})


// user login api endpoint
router.post("/login", async (req, res) => {
    try {
        // Check if user already exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {

            throw new Error("user not found");

            // we can use both , i.e above throw and below return method to show error 

            // return res.send({
            //     success : false,
            //     message : "User not found"
            // })
        }

        // compare password

            
        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            throw new Error("Invalid Password");
        }

        // create and assigning the token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);


        // sending response

        res.send({
            success: true,
            message: "User Logged In Successfully",
            data: token
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

// get-current-user endpoint

router.post("/get-current-user" ,async(req,res)=>{
    try {
        
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        })
    }
})

module.exports = router;