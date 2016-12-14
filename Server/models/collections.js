/**
 * Created by The BigBang on 10.12.2016.
 */
var mongoose = require( 'mongoose' );

//definition of collection and objects documents

var objSchema = new mongoose.Schema({
    collectionId:String, //reference to a collection
    index:Number, //for sorting
    src:String,
    src_2:String,
    alt:String,
    title:String,
    div_class:String,
    img_class:String,
    img_num:Number,
    gfy:String,
    gal_next:String,
    start_gallery:String,
    top_text_1:String,
    top_text_2:String,
    bottom_text_1:String,
    bottom_text_2:String,
    adbox_01:String

});

var collectionSchema=new mongoose.Schema({
    name:String
});

var templateSchema=new mongoose.Schema({
    name:String,
    template:String

});


var collectionSchema=mongoose.model('Collection',collectionSchema);
var objSchema=mongoose.model('Object',objSchema);
var templateSchema=mongoose.model("Template",templateSchema);

module.exports.collectionSchema = collectionSchema;
module.exports.objSchema = objSchema;
module.exports.templateSchema = templateSchema;