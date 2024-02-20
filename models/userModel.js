'use strict';

var mongoose= require('mongoose');
var userModel=function(){
    var userSchema=mongoose.Schema({
        username:String,
        password:String
    });
    return mongoose.model('user',userSchema)
};

module.exports=new userModel();