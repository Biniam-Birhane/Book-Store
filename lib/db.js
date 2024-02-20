'use strict'
var mongoose = require('mongoose');

var db=function(){
    return{
        config:function(config){
            mongoose.connect('mongodb://localhost/bookstore',);
            var db=mongoose.connection;
            db.on('error',console.error.bind(console,'connection error'));
            db.once('open',function(){
                useNewUrlParser: true,
                console.log('db connection open');
            });
        }
    };
}

module.exports= db();