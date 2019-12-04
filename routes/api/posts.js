const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Post model
const Post = require('../../models/Post');
// Profile model
const Profile = require('../../models/Profile');

const User = require('../../models/User')
// Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Posts Works' }));

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get('/', (req, res) => {
  // Post.find()
  //   .sort({ date: -1 })
    // .then(posts => res.json(posts))
    // .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.render("showall",{posts:posts}));
  // Post.find({},(err,posts)=>{
  //   if(err){
  //     console.log(err);
  //   }else{
      
  //     res.render("showAll",{posts:posts})
  //   }
  // })
    
});
router.get('/filter/:price/:location/:payment',(req,res)=>{


   
  function filterByPrice(posts) {
    let final = posts.filter(post=>
      post.price == req.params.price
      )
    return final
  }
  function filterByPayment(posts) {
    let final = posts.filter(post=>
      post.payment == req.params.payment
      )
    return final
  }

  function filterByLocation(posts) {
    
    
    let final = posts.filter(post=>
      post.location == req.params.location
      )
      return final
  }
  

  if(1){
    // Post.find({
    //   "price":`${req.params.price}`
      
    // }).then(posts=> {
    //   console.log(posts);
      
     
    //   if (!posts){
    //     getposts
    //   }
    
    Post.find()
    .sort({date:-1})
    .then(posts=>{
          
          let  final = posts
            
            final = (req.params.price == "*" ) ? final : filterByPrice(final)  
           
           
            final = (req.params.location == "*" ) ? final : filterByLocation(final)
           
            
            final = (req.params.payment == "*" ) ? final : filterByPayment(final)
           
            
          res.send(final);
          return;
          
        }).catch(err=>res.status(404).json({ error404:'Something went wrong'}))
      
    }

})

router.get('/filterBy/:technologies/:price/:location/:payment', (req, res) => {
  if (req.params.technologies.slice(0,1)==","){
    req.params.technologies = req.params.technologies.substring(1)
  }
  
  function filterByPrice(posts) {
    let final = posts.filter(post=>
      post.price == req.params.price
      )
    return final
  }
  function filterByPayment(posts) {
    let final = posts.filter(post=>
      post.payment == req.params.payment
      )
    return final
  }

  function filterByLocation(posts) {
    
    
    let final = posts.filter(post=>
      post.location == req.params.location
      )
      return final
  }
  

  // if(req.params.technologies == "*"){
  //   // Post.find({
  //   //   "price":`${req.params.price}`
      
  //   // }).then(posts=> {
  //   //   console.log(posts);
      
     
  //   //   if (!posts){
  //   //     getposts
  //   //   }
    
  //   Post.find()
  //   .sort({date:-1})
  //   .then(posts=>{
          
  //         let  final = posts
            
  //           final = (req.params.price == "*" ) ? final : filterByPrice(final)  
           
           
  //           final = (req.params.location == "*" ) ? final : filterByLocation(final)
           
            
  //           final = (req.params.payment == "*" ) ? final : filterByPayment(final)
  //           console.log(final);
            
  //         res.send(final);
  //         return;
          
  //       }).catch(err=>res.status(404).json({ error404:'Something went wrong'}))
      
  //   }
  
   
  const terms = req.params.technologies.split(",")
  Post.find(
    {
      'technologies': {
        '$all': 
         terms
      },  
    }
  ).sort({ date: -1 })
  .then(posts=>{
    

          let  final = posts
              
            final = (req.params.price == "*" ) ? final : filterByPrice(final)  
            
            final = (req.params.location == "*" ) ? final : filterByLocation(final)
           
            final = (req.params.payment == "*" ) ? final : filterByPayment(final)
           
          
          
          res.send(final).catch(err=>console.log(err))
    
    
  }).catch(err=>res.status(404).json({ error404:'Something went wrong'}))
 
    
});
router.get('/all', (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }));
  // Post.find()
  //   .sort({ date: -1 })
  //   .then(posts => res.render("showall",{posts:posts}));
  // Post.find({},(err,posts)=>{
  //   if(err){
  //     console.log(err);
  //   }else{
      
  //     res.render("showAll",{posts:posts})
  //   }
  // })
    
});

// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Public
router.get('/:id', (req, res) => {
  Post.findById(req.params.id)
   .then(post=> 
    User.findById(post.user).then(user=>{
      Profile.findOne({user:post.user}).then(profile=>{
      if(!profile){
        res.render('404',{error:'profile not found'})
        return
      }
      let date = user.date.toString()
      let email = user.email
    res.render('postshow',{post:post,profile:profile,userdate:date.substring(4,15),useremail:email})
    })
    })
    )
    .catch(err =>
      res.status(404).json({ nopostfound: 'No post found with that ID' })
    );
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      description: req.body.description,
      technologies: req.body.technologies,
      title: req.body.title,
      price: req.body.price,
      payment:req.body.payment,
      location:req.body.location,
      user: req.user.id
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // Check for post owner
          if (post.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: 'User not authorized' });
          }

          // Delete
          post.remove().then(() => res.json({ success: true }));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: 'User already liked this post' });
          }

          // Add user id to likes array
          post.likes.unshift({ user: req.user.id });

          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: 'You have not yet liked this post' });
          }

          // Get remove index
          const removeIndex = post.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Splice out of array
          post.likes.splice(removeIndex, 1);

          // Save
          post.save().then(post => res.json(post));
        })
        .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
    });
  }
);

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if (!isValid) {
      // If any errors, send 400 with errors object
      return res.status(400).json(errors);
    }

    Post.findById(req.params.id)
      .then(post => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        // Add to comments array
        post.comments.unshift(newComment);

        // Save
        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        // Check to see if comment exists
        if (
          post.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: 'Comment does not exist' });
        }

        // Get remove index
        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        // Splice comment out of array
        post.comments.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      })
      .catch(err => res.status(404).json({ postnotfound: 'No post found' }));
  }
);

module.exports = router;
