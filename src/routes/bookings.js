const express = require('express');
const bookingsRouter = express.Router();
const { userAuth } = require('../middlewares/auth');
const Activity = require('../models/Activity');
const Booking = require('../models/Booking')

bookingsRouter.post('/:activityId', userAuth, async (req, res)=>{
    try{
        const { activityId } = req.params;
        const loggedInUserId = req.user._id;

        const activity = await Activity.findById(activityId);
        if (!activity) {
            return res.status(404).json({ message: "Activity not found" });
          }

        //  Prevent duplicate booking
        const alreadyBooked = await Booking.findOne({ user: loggedInUserId, activity: activityId });

        if (alreadyBooked) {
            return res.status(400).json({ message: "You already booked this activity" });
          }

        const booking = new Booking({
            user: loggedInUserId,
            activity: activityId
        })
        await booking.save();
        
        res.json({ 
            message: "Activity booked successfully" 
        });

    }catch(err){
        res.status(500).json({ message: "Server error", error: err });
    }
})

bookingsRouter.get('/me', userAuth, async (req, res)=>{
    try{
        const loggedInUserId = req.user._id;

        const bookings = await Booking.find({ user:  loggedInUserId}).populate('activity');

        res.json({
            Bookings: bookings
        })
    }catch(err){
        res.status(500).json({ message: "Server error", error: err });
    }
})

module.exports = bookingsRouter;























