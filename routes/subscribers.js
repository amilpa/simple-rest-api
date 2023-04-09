const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribers')

// Getting all
router.get('/' , async (req,res)=>{
    try{
        const subscriber = await Subscriber.find()
        res.json(subscriber)
    }
    catch(e)
    {
        res.status(500).json({ message : e.message })
    }
})
// Getting one
router.get('/:id',getSubcriber,(req,res)=>{
    res.send(res.subscriber)
})
// Creating one
router.post('/' , async (req,res) =>{
    const subscriber = new Subscriber({
        name : req.body.name,
        subscribedToChannel : req.body.subscribedToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
    catch(e)
    {
        res.status(400).json({ message : e.message })
    }
})
// Updating one
router.patch('/:id', getSubcriber ,async (req,res)=>{

})
// Deleting one
router.delete('/:id', getSubcriber ,async (req,res)=>{
    try{
        await res.subscriber.deleteOne()
        res.json({ message : "Deleted subscriber"})
    }
    catch(e)
    {
        res.status(500).json({message : e.message })
    }

})

async function getSubcriber(req,res,next) {
    let subscriber
    console.log("Hello world")
    try{
        subscriber = await Subscriber.findById(req.params.id)
        if(subscriber==null)
        {
            return res.status(404).json({message:"Cannot find subscriber"})
        }
    }
    catch(e)
    {
        return res.status(500).json({ message : e.message })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router