/**
 * Created by The BigBang on 12.12.2016.
 */
var express = require('express');
var router = express.Router();
var collectionModel=require('../models/collections');

router.get('/',function(req,res,next){

    collectionModel.templateSchema.find({},function(err, templateNames){
        if(err){
            throw err;
        }
        else{
            res.send(templateNames);
        }
    });


});
router.post('/',function(req,res,next){
    collectionModel.templateSchema.create({
        name:req.body.name,
        template: req.body.template
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
router.post('/edit',function(req,res,next){
    collectionModel.templateSchema.findByIdAndUpdate(req.body.templateId,{
        name:req.body.name,
        template: req.body.template
    },function(err,obj){
        if(err){
            throw err;
        }
        else{
            res.sendStatus(res.statusCode);
        }
    })
})


router.get('/delete',function(req,res,next){
    collectionModel.templateSchema.remove({_id:req.query.templateId},function(err,obj){

        if(err){

            throw err;
        }
        else{
            res.sendStatus(res.statusCode);
        }

    })


});
router.get('/getTemplate',function(req,res,next){

    collectionModel.templateSchema.find({_id:req.query.templateId},function(err, templateNames){
        if(err){
            throw err;
        }
        else{
            res.send(templateNames);
        }
    });


});

module.exports = router;