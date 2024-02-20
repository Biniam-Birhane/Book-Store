'use strict'
var Book=require('../models/bookModel');
var Category=require('../models/categoryModel');
var User=require('../models/userModel');


module.exports=function(router){
	router.get('/',function(req,res){
		User.find({},function(err,user){
			if(err){
				console.log(err);
			}
			var model={
				user:user
			}
			res.render('manage/login',model)
		}); 
	});

	router.post('/login',function(req,res){
		var name =req.body.username && req.body.username.trim();
		var password=req.body.password && req.body.password.trim();
		
		User.find({},function(err,user){
			if(err){
				console.log(err);
			}
			var model={
				user:user
			}
			res.render('manage/index',model)
		}); 
		
	});

	router.get('/books',function(req,res){
		Book.find({},function(err,books){
			if(err){
				console.log(err);
			}
			var model ={
				books:books//passing the values
			};
		
			res.render('manage/books/index',model);
		})
	});
	router.get('/books/add',function(req,res){
		Category.find({},function(err,catagories){
			if(err){
				console.log(err);
			}

			var model={
				catagories:catagories
			};
			res.render('manage/books/add',model);
		})
	});
	router.post('/books',function(req,res){
		var title = req.body.title && req.body.title.trim();
		var category = req.body.category && req.body.category.trim();
		var publisher = req.body.publisher && req.body.publisher.trim();
		var author = req.body.author && req.body.author.trim();
		var price = req.body.title && req.body.price.trim();
		var description = req.body.description && req.body.description.trim();
		var cover = req.body.cover && req.body.cover.trim();

		if(title =='' || price ==''){
			req.flash('error',"please fill the required fields");
			res.location('/manage/books/add');
			res.redirect('/manage/books/add');
		}
		/*if(isNaN('price')){
			req.flash('error',"price must be a number");
			res.location('/manage/books/add');
			res.redirect('/manage/books/add');
		}*/
		var newBook= new Book({
			title:title,
			category:category,
			publisher:publisher,
			author:author,
			price:price,
			description:description,
			cover:cover
		})
		newBook.save(function(err){
			if(err){
				console.log(err);
			}
			req.flash('success',"book added successfully");
			res.location('/manage/books');
			res.redirect('/manage/books');
		})
		
	});
	router.get('/books/edit/:id',function(req,res){
		Category.find({},function(err,categories){
			Book.findOne({_id:req.params.id},function(err,book){
				if(err){
					console.log(err);
				}
				var model={
					book: book,
					categories:categories
				};
				res.render('manage/books/edit',model);
			});
		})
	});


	router.post('/books/edit/:id',function(req,res){
		var title = req.body.title && req.body.title.trim();
		var category = req.body.category && req.body.category.trim();
		var publisher = req.body.publisher && req.body.publisher.trim();
		var author = req.body.author && req.body.author.trim();
		var price = req.body.title && req.body.price.trim();
		var description = req.body.description && req.body.description.trim();
		var cover = req.body.cover && req.body.cover.trim();

		Book.update({_id:req.params.id},{
			title:title,
			category:category,
			publisher:publisher,
			author:author,
			price:price,
			description:description,
			cover:cover
		},function(err){
				if(err){
					console.log(err);
				}
				req.flash('success',"book updated successfully");
			    res.location('/manage/books');
				res.redirect('/manage/books');
		});
	});
	router.delete('/books/delete/:id',function(req,res){
		Book.remove({_id:req.params.id},function(err){
			if(err){
				console.log(err);
			}
				req.flash('success',"book deleted successfully");
			    res.location('/manage/books');
				res.redirect('/manage/books');
		})
	});
	router.get('/categories',function(req,res){
		Category.find({},function(err,categories){
			if(err){
				console.log(err);
			}
			var model ={
				categories:categories
			};
			res.render('manage/categories/index',model);
		})
	});


	router.post('/categories',function(req,res){
		var name = req.body.name && req.body.name.trim();
		if(name ==''){
			req.flash('error',"please fill the required fields");
			res.location('/manage/categories/add');
			res.redirect('/manage/catagories/add');
		}
		var newCategory= new Category({
			name:name
		})
		newCategory.save(function(err){
			if(err){
				console.log(err);
			}
			req.flash('success',"category added successfully");
			res.location('/manage/categories');
			res.redirect('/manage/categories');
		})
		
	});

	router.get('/categories/add',function(req,res){
		res.render('manage/categories/add');
	});

	router.get('/categories/edit/:id',function(req,res){
		Category.findOne({_id:req.params.id},function(err,categories){
			if(err){ 
				console.log(err);
			}
			var model={
				categories:categories
			};
			res.render('manage/categories/edit',model); 
		});
	});	

	router.post('/categories/edit/:id',function(req,res){
		var name = req.body.name && req.body.name.trim();
		Category.update({_id:req.params.id},{
			name:name
		},function(err){
				if(err){
					console.log(err);
				}
				req.flash('success',"category updated successfully");
			    res.location('/manage/categories');
				res.redirect('/manage/categories'); 
		});
	});

	router.delete('/categories/delete/:id',function(req,res){
		Category.remove({_id:req.params.id},function(err){
			if(err){
				console.log(err);
			}
				req.flash('success',"category deleted successfully");
			    res.location('manage/categories');
				res.redirect('manage/categories');
		})
	});
};
