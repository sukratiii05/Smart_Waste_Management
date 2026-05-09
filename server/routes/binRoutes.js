const express=require('express')
const router=express.Router()
const Bin=require('../models/Bin')

// GET all bins
router.get('/',async(req,res)=>{
  const data=await Bin.find()
  res.json(data)
})

// ADD bin
router.post('/',async(req,res)=>{
  const bin=new Bin(req.body)
  await bin.save()
  res.json(bin)
})

// UPDATE bin
router.put('/:id',async(req,res)=>{
  const updated=await Bin.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  )
  res.json(updated)
})

module.exports=router