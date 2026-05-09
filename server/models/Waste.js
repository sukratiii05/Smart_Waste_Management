const mongoose=require('mongoose')

const wasteSchema=new mongoose.Schema({
  type:String,
  confidence:Number,
  createdAt:{
    type:Date,
    default:Date.now
  }
})

module.exports=mongoose.model("Waste",wasteSchema)