

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to my BlogPost Application! Fancy seeing yourself here. I'm currently working to deploy this, learning and constantly adding new features in it until it all comes together to be what I've envisioned it to be. Try running this application once again by forking the updated code after sometime.";
const aboutContent = "Welcome to my BlogPost Application! Fancy seeing yourself here. I'm currently working to deploy this, learning and constantly adding new features in it until it all comes together to be what I've envisioned it to be. Try running this application once again by forking the updated code after sometime.";
const contactContent = "Welcome to my BlogPost Application! Fancy seeing yourself here. I'm currently working to deploy this, learning and constantly adding new features in it until it all comes together to be what I've envisioned it to be. Try running this application once again by forking the updated code after sometime.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
