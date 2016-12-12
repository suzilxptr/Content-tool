/**
 * Created by The BigBang on 10.12.2016.
 */
var express = require('express');
var router = express.Router();
var collectionModel=require('../models/collections');

/*index route "/collectionEvents"

* sub routes
*
* /collectionEvents (GET, POST)
*
* /collectionEvents/delete/?collectionId=req.body.collectionId (DELETE)
*
* /collectionEvents/edit (EDIT as POST) collectionId needed as extra field
* */


router.get('/',function(req,res,next){

    collectionModel.collectionSchema.find({},function(err, collectionNames){
        if(err){
            throw err;
        }
       else{
        res.send(collectionNames);
        }
    });


});


router.post('/',function(req,res,next){
    collectionModel.collectionSchema.create({
            name:req.body.name
    },function(err, obj) {
        if (err){
            throw err;
        }
        else{
            console.log(obj);
            res.send({
                data:obj,
                status:res.statusCode
            });
        }
    });


});

router.get('/delete',function(req,res,next){
    collectionModel.collectionSchema.remove({_id:req.query.collectionId},function(err,obj){
        if(err){

            throw err;
        }
        else{
            res.sendStatus(res.statusCode);
        }

    })

});

router.post('/edit',function(req,res,next){
    collectionModel.collectionSchema.findByIdAndUpdate(req.body.collectionId,{
        name:req.body.name
    },function(err,obj){
        if(err){
            throw err;
        }
        else{
            res.sendStatus(res.statusCode);
        }
    })
})


module.exports = router;