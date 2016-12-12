/**
 * Created by The BigBang on 10.12.2016.
 */
var express = require('express');
var router = express.Router();
var collectionModel=require('../models/collections');


/*index route "/objectEvents"
 * sub routes
 *
 * /objectEvents/?collectionId=req.body.collectionId (GET)
 *
 * /objectEvents (POST) collectionId needed as extra field
 *
 * /objectEvents/delete/?objectId=req.body.objectId (DELETE)
 *
 * /objectEvents/edit (EDIT as POST) objectId needed as extra field
 *
 * */

router.get('/',function(req,res,next){
    console.log(req.query);
    collectionModel.objSchema.find({collectionId:req.query.collectionId},function(err, data){
        console.log(data);
        if (data.length >0){
        res.send(data);
        return;
        }
        res.send([]);
    });
});


router.post('/', function(req,res,next){
    
    
    objectSchema={};
    for (var key in req.body){  
            objectSchema[key]=req.body[key];
        }
    
    
    collectionModel.objSchema.create(
        objectSchema
        , function(err, obj) {
            if (err){
                throw err;

            }
            else{
                res.send({
                    data:obj,
                    status:res.statusCode
                });

            }
    });
});

router.get('/delete',function(req,res,next){
    collectionModel.objSchema.remove({_id:req.query.objectId},function(err,obj){
        if(err){
            throw err;
        }
        else{
            res.sendStatus(res.statusCode);
        }
    })
})

router.post('/edit',function(req,res,next){

    collectionModel.objSchema.findByIdAndUpdate(req.body.objectId,{
        src:req.body.src,
        src_2:req.body.src_2,
        alt:req.body.alt,
        title:req.body.title,
        div_class:req.body.div_class,
        img_class:req.body.img_class,
        img_num:req.body.img_num,
        gfy:req.body.gfy,
        gal_next:req.body.gal_next,
        start_gallery:req.body.start_gallery,
        top_text_1:req.body.top_text,
        top_text_2:req.body.top_text_2,
        bottom_text_1:req.body.bottom_text_1,
        bottom_text_2:req.body.bottom_text_2,
        adbox_01:req.body.adbox_01

    },function(err,obj){
        if(err){
            throw err;
        }
        else{
            res.send(res.statusCode);

        }

    })

})

module.exports = router;