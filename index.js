const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,  'public'))); // for use of html css and js in ejs



app.get("/", function(req,res){
    fs.readdir(`./files`,function(err,files){
        // res.send("welcome");
    res.render("index",{files:files}); // ye view  index page ko run karega 
    })

    
});

app.get('/file/:filename',function(req,res){
    fs.readFile(`./files/${req.params.filename}`,"utf-8" , function(err,filedata){
        res.render('show',{filename:req.params.filename,content:filedata});
    })
});//utf-8 to read data in english if not use then data will shoe in buffer

app.get('/edit/:filename',function(req,res){
    res.render('edit',{filename:req.params.filename});
});



app.post('/edit', function(req, res){
    fs.rename(`./files/${req.body.previous}`,`./files/${req.body.new}`,function(err){
        res.redirect("/");
    })
});


app.post("/create", function(req,res){
    //console.log(req.body);  data aa ra h body se
    fs.writeFile(`./files/${req.body.title.split(' ').join('+')}.txt`,req.body.details,function(err){
        res.redirect("/"); //file create hoke wapas root page p aajayeh=gi taki or notes bna sake 
    });
});


app.listen(3000);