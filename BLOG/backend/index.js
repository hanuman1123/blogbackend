import express from "express";
import dotenv from "dotenv";

import  userRoute from "./routes/user.route.js"

dotenv.config()

import connectDB from "./lib/db.js";

const app = express();

app.use(express.json())

app.use("/api/users",userRoute)


const PORT = process.env.PORT;

app.listen(PORT, (req,res)=>{
    console.log("server was running in th port 3000");
    connectDB();
    
})





