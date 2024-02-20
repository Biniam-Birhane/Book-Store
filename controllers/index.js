'use strict'
var Book=require('../models/bookModel');

module.exports=function(router){
	router.get('/',function(req,res){
        Book.find({},function(err,books){//getting value from the database
            if(err){
                console.log(err);
            }
            // we are specifying the length of the description to 50;
            books.forEach(function(book){
                book.truncText=book.truncText(50);
            });
            var model ={
                books:books//passing the values inside the books document
            }
            res.render('index',model);
        }); 
		
    });

    router.get('/about',function(req,res){
        res.render('about');
    })
};