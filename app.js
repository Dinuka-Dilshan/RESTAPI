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

//chained routes
/////////////////////////////////////////////routes for all articles///////////////////////////////////////////

app.route('/articles').get((req,res)=>{
    
    Article.find({},(error,foundArticles)=>{
        if(!error){
            res.send(foundArticles);
        }else{
            res.send(error);
        }
    });


})

.post((req,res)=>{
    
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });

    article.save((error)=>{
        if(!error){
            res.send("Insert successfull");
        }else{
            res.send(err);
        }
    });
})

.delete((req,res)=>{

    Article.deleteMany((error)=>{
        if(!error){
            res.send("Successfully deleted all the articles");
        }else{
            res.send(error);
        }
    })

});

/////////////////////////////////////////////routes for a specific article ///////////////////////////////////////////


app.route('/articles/:articleTitle')

.get((req,res)=>{

    Article.findOne({title:req.params.articleTitle},(error,foundArticle)=>{
        if(foundArticle){
            res.send(foundArticle);
        }else{
            res.send("no such article found");
        }
    });

})

.put((req,res)=>{

    Article.updateOne(
        {title:req.params.articleTitle},
        {title:req.body.title, content: req.body.content},
        (error)=>{
            if(!error){
                res.send("Updated");
            }else{
                res.send(error);
            }
        }
    );

})

.patch((req,res)=>{

    const response = Article.updateOne(
        {title:req.params.articleTitle},
        {$set:req.body},
        (error,result)=>{
            if(!error){
                res.send(result.nModified+" articles updated");
            }else{
                res.send(error);
            }
        }
    );

})

.delete((req,res)=>{

    Article.deleteOne(
        {title:req.params.articleTitle},
        (error,result)=>{
            if(error){
                res.send(error);
            }else{
                res.send(result);
            }
        }
    );

});





app.listen(3000,()=>{
    console.log("server started on port 3000");
});