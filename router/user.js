const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const auth = require('../middleware/auth');


router.post("/upload",(req,res)=>{
    //console.log(req.body)
   var myData = new User(req.body);
   myData.save();
});

router.post("/login", async function(req, res){

    const user = await User.checkCrediantialsDb(req.body.username,
   req.body.password)
    const token = await user.generateAuthToken()
    console.log("Success")
   
   })
//get ko lagi code
router.get('/urs',auth,function(req,res){
    User.find().then(function(user_data){
        res.send(user_data);

    
}).catch(function(e){
    
            res.send(e)
        
    });
})
//yaha sama  get ko code 


//yaha bata taltira delete ko 
router.delete('/del/:id',function(req,res){
    User.findByIdAndDelete(req.params.id).then(function(){

    }).catch(function(){
        res.send(e)
    })
});

router.put('/updates/:id',function(req,res){
    User.findOneAndUpdate({_id :req.params.id},req.body).then(function(){
        res.send("updated")
    }).catch(function(e){
        res.send(e)
    })
})


module.exports = router