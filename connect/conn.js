const mongoose = require("mongoose");

const conn = async ()=>{
 try {
    await mongoose
    .connect("mongodb+srv://kumarrajakonna8:kumarrajakonna8@cluster0.f9lp1gg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{
     console.log("connected")
    })
 } catch (error) {
    console.log(error) 
 }
}
conn()