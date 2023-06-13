const express = require('express')
const app = express();
app.use(express.json());
require('dotenv').config();
const dbConfig = require("./config/dbConfig");

const usersRoute = require("./routes/usersRoute") 
app.use("/api/users",usersRoute);

const productsRoute = require("./routes/productsRoute");
app.use("/api/products" , productsRoute);

const port = process.env.PORT || 5000;
app.listen(port , ()=> console.log(`Node Js server started at ${port + " " + process.env.MONGO_URI}`))


