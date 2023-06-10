const jwt = require("jsonwebtoken")

module.exports = (req,res,next)=>{
    try {
        // get the token
    } catch (error) {
        res.send({
            success: false,
            message : error.message
        })
    }
}