const express=require('express')
const router=express.Router()
const Waste=require('../models/Waste')

router.get('/',async(req,res)=>{
  const data=await Waste.find()
  res.json(data)
})

router.post('/',async(req,res)=>{
  const waste=new Waste(req.body)
  await waste.save()
  res.json({msg:"Saved"})
})
router.get('/stats', async (req, res) => {
  try {
    const total = await Waste.countDocuments();

    const highConfidence = await Waste.countDocuments({
      confidence: { $gt: 80 }
    });

    const avg = await Waste.aggregate([
      {
        $group: {
          _id: null,
          avgConfidence: { $avg: "$confidence" }
        }
      }
    ]);

    const avgConfidence = avg[0]?.avgConfidence || 0;

    res.json({
      total,
      highConfidence,
      avgConfidence: Math.round(avgConfidence)
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=router