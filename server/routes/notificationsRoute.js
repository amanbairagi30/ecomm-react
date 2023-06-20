const router = require('express').Router();
const authMiddleware = require("../middlewares/authMiddleware")
const Notification = require("../models/notificationsModel");

// add a notification

router.post("/notify" , authMiddleware , async (req,res)=>{
    try {
        const newNotification = new Notification(req.body);
        await newNotification.save();

        res.send({
            success : true,
            message : "Notification Added Successfully",
        })
        
    } catch (error) {
        res.send({
            success : false,
            message : error.message,
        })
    }
})

// get all notification by user

router.get("/get-all-notification" , authMiddleware , async (req,res)=>{
    try {
        
        const notifications = await Notification.find({
            user : req.body.userId,
        }).sort({createdAt : -1});

        res.send({
            success : true,
            data : notifications,
        })

    } catch (error) {
        res.send({
            success : false,
            message : error.message,
        })
    }
})

// delete notification

router.delete("/delete-notification/:id" , authMiddleware , async(req,res)=>{
    try {
        await Notification.findByIdAndDelete(req.params.id)
        res.send({
            success : true,
            message : "Notification Deleted Successfully",
        })
    } catch (error) {
        res.send({
            success : false,
            message : error.message,
        })
    }
})

// read all notifications

router.put("/read-all-notifications" , authMiddleware , async(req,res)=>{
    try {
        await Notification.updateMany(
            {user : req.body.userId , read : false},
            {$set : {read :  true}}
        );
        res.send({
            success : true,
            message : "Notification read successfully"
        })
        
    } catch (error) {
        res.send({
            success : false,
            message : error.message,
        }) 
    }
})

module.exports = router