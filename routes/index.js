const express = require('express');
const router   = express.Router();

router.get('/',(req,res)=>{
    res.render('home');
})
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register');
})
router.get('/createProfile',(req,res)=>{
    res.render('createProfile');
})
router.get('/createPost',(req,res)=>{
    res.render('createPost');
})
module.exports = router;