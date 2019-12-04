const express  = require('express');
const router   = express.Router();
const gravatar = require("gravatar");
const bcrypt   = require("bcryptjs");
const User     = require("../../models/User");
const jwt      = require("jsonwebtoken");
const keys     = require("../../config/Keys");
const passport = require("passport");
const bodyParser = require("body-parser")

express().use(bodyParser())

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get('/',(req,res)=>{
   
   User.find().then(users=>{
       res.json(users)
   })
})

//! //_ROUTE_POST_PUBLIC_//_:REGISTER NEW USER_______________________________________________________________________________________\\
router.post('/register',(req,res)=>{
    //* Valdation
    const {errors,isValid} = validateRegisterInput(req.body);

    if(!isValid){
        return res.status(400).json(errors);
    }
    //*_________

    User.findOne({email:req.body.email})
        .then(user => {
            if(user){
                res.status(400).json({email:'Email already exists.'})
            }else{
                const newUser = new User ({
                   
                    email:req.body.email,
                    password:req.body.password,
                })
                bcrypt.genSalt(10,(err,salt)=>{
                   bcrypt.hash(newUser.password,salt,(err,hash)=>{
                       if(err)console.log(err);
                       newUser.password = hash;
                       newUser.save()
                       .then(user=>res.json(user))
                       .catch(err=>console.log(err))
                   })
                })
            }
        })
})
//! //_ROUTE_GET_PUBLIC_//_:LOGIN USER_______________________________________________________________________________________\\
router.post('/login',(req,res)=>{
      //* Valdation
      

      const {errors,isValid} = validateLoginInput(req.body);
        
      if(!isValid){
          return res.status(400).json(errors);
      } 
    
      //*_________

    const email = req.body.email;
    
    const password = req.body.password;
    
    User.findOne({email:email})
    .then(user=>{
        if(!user){
            res.status(404).json({email:'User not found.'}).catch(err=>console.log(err))
        }
        bcrypt.compare(password,user.password)
            .then(isMatch=>{
                if(isMatch){
                    const jwt_payload = {
                        id: user.id,
                        name: user.name, 
                    }
                    jwt.sign(
                        jwt_payload,
                        keys.secret,
                        {expiresIn:86400},
                        (err,tocken)=>{
                            res.json({
                                succes:true,
                                tocken:'Bearer '+ tocken
                            })
                        }
                    )
                }else{
                    res.status(400).json({password:'Password incorrect.'})
                }
            })
    })
})
//! //_ROUTE_GET_PRIVATE_//_:GET CURRENT USER_______________________________________________________________________________________\\
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email
    })
})
router.get('/:id',(req,res)=>{
   
    User.findById(req.params.id).then(users=>{
        res.json(users)
    })
 })

module.exports = router;