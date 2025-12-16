import connectDB from "./db/index.js";
import {app} from './app.js'

import dotenv from 'dotenv'
dotenv.config({ path: './.env' })

connectDB()

.then(()=>{
   app.listen(process.env.PORT || 8000, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`);
   })
    
})
.catch((error)=>{
    console.error("MONGO DB conection failed!!!", error);
})







// import mongoose from "mongoose";
// import { DB_NAME } from "../constants.js";

// import express from "express";
// const app = express();

// //iife
// (async ()=>{
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error", (error)=>{
//             console.error("ERRR:", error);
//             throw error //express error
//         })

//         app.listen(process.env.PORT, ()=>{
//             console.log(`App is listening on ${process/env.PORT}`);     
//         })

//     } catch (error) {
//         console.error("Error :", error);
//         throw err
//     }
// })()