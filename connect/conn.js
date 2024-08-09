const mongoose = require("mongoose");

const conn = async (req,res)=>{
 try {
    await mongoose
    .connect("mongodb+srv://kumarrajakonna8:Konnakumar@cluster0.f9lp1gg.mongodb.net/")
    .then(()=>{
     console.log("connected")
    })
 } catch (error) {
    console.log(error) 
 }
}
conn()