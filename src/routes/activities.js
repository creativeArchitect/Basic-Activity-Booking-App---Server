const express = require('express');
const activitiesRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const { validateActivitiesAddition } = require('../utils/validation');
const Activity = require('../models/Activity');

activitiesRouter.post('/', async (req, res)=>{
    try{
        validateActivitiesAddition(req);

        const { title, description, location, dateTime } = req.body;

        const activity = new Activity({
            title,
            description,
            location,
            dateTime,
        })
        const savedActivity = await activity.save();
        
        res.status(201).json({
            message: "Activity created successfully",
            data: savedActivity,
          });
    }catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }    
})
activitiesRouter.get('/', async(req, res)=>{
    try{
        const activities = await Activity.find().sort({ dateTime: 1 });
        if(activities.length === 0){
            res.json({
                message: "no activity found"
            })
        }
        res.json({
            Activities: activities
        })
    }catch(err){
        res.status(500).json({ message: "Server error", error: err.message });
    }
})


module.exports = activitiesRouter;



















