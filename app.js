const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.set('view engine','ejs');
app.use(express.static('public'));

mongoose.connect("mongodb://localhost:27017/wikiDB",{useNewUrlParser:true ,useUnifiedTopology: true});

const articleSchema = new mongoose.Schema({
    title:String,
    content: String
})

const Article = new mongoose.model('Article',articleSchema);


app.get("/articles",(req,res)=>{
    
    Article.find({},(error,foundArticles)=>{
        if(!error){
            res.send(foundArticles);
        }else{
            res.send(error);
        }
    });


});

app.post("/",(req,res)=>{
    res.redirect("/");
});

app.listen(3000,()=>{
    console.log("server started on port 3000");
});