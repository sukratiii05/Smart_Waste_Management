require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const binRoutes = require("./routes/binRoutes");


const app=express()
const wasteRoutes = require("./routes/wasteRoutes")
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use("/waste", wasteRoutes)
app.use(cors())
app.use(express.json())
app.use("/bins", binRoutes);
console.log("URI:", process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  console.log("DB connected")

  app.listen(5000,()=>{
    console.log("Server running on port 5000")
  })

})
.catch(err=>console.log(err))
app.get("/waste",(req,res)=>{
  res.send("API working 🚀")
})