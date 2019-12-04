const express = require('express');
const router = express.Router();
const mongoose = require  ("mongoose");
const passport = require("passport");

// Profile model
const Profile = require("../../models/Profile");
// User model
const User = require("../../models/User");

const validateProfileInput = require("../../validation/profile");


router.get('/test',(req,res)=>{
    res.json({message:'This is Profiles.'})
})

//! ROUTE_GET_PRIVATE__//_CURRENT USER'S PROFILE______
router.get('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    const errors = {};
    Profile.findOne({user:req.user.id})
        .then(profile=>{
            if(!profile){
               errors.noprofile = 'There is no profile for this user';
              return res.status(404).json(errors); 
            }
            res.json(profile);
            
        })
        .catch(err=>res.status(404).json(err))
})
//! ROUTE_POST_PRIVATE__//_CREATE/UPDATE PROFILE______
router.post('/',passport.authenticate('jwt',{session:false}),(req,res)=>{
    //* VALIDATION
    const { errors , isValid} = validateProfileInput(req.body);
    //check validation
    if(!isValid){
        //return error 400
        return res.status(400).json(errors); 
    }
    //*___________

    //* get fields
    const profilefields = {};
    profilefields.user = req.user.id;
    if(req.body.profileName) profilefields.profileName = req.body.profileName;
    if(req.body.location) profilefields.location = req.body.location;
    if(req.body.phoneNumber) profilefields.phoneNumber = req.body.phoneNumber;
    if(req.body.title) profilefields.title = req.body.title;
    if(req.body.bio) profilefields.bio = req.body.bio;
    if(req.body.firstName) profilefields.firstName = req.body.firstName;


    Profile.findOne({ user:req.user.id}).then(profile=>{
        if(profile){
            Profile.findOneAndUpdate(
                {user:req.user.id},
                { $set:profilefields},
                { new:true}
            ).then(profile => res.json(profile));
        }else{
        Profile.findOne({profileName:profilefields.profileName})
        .then(profile=>{
            if(profile){
                errors.profileName = 'Profile name already exists';
                res.status(400).json(errors)
            }
            new Profile(profilefields).save().then(profile=>res.json(profilefields))
        })
    }
    })
})
router.get('/:email',(req,res)=>{
    User.findOne({email:req.params.email}).then(
        user=>{
            if(!user){res.render('404',{error:'user not found'})}
            Profile.findOne({user:user._id}).then(profile=>{
                if(!profile){res.render('404',{error:'user found but has no profile'})}
                res.render("profileshow",{profile:profile})
            }).catch(err=>res.json('not found'))
           
        }
    )
})
module.exports = router;