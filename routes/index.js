const express = require('express');
const router   = express.Router();
var posts = []
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
router.get('/BrowseJobs',(req,res)=>{
    res.redirect('/api/posts')
})
router.get('/about',(req,res)=>{
    res.render('about')
})

router.get('*',(req,res)=>{
    res.render('404',{error:"unspecified error..."})
})

module.exports = router;