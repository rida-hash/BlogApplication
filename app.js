//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require('lodash');

const homeStartingContent = "Welcome to my BlogPost Application! Fancy seeing yourself here. I'm currently working to deploy this, learning and constantly adding new features in it until it all comes together to be what I've envisioned it to be. Try running this application once again by forking the updated code after sometime.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts = [];


mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', function(req, res){
  res.render('home', { mainContent :homeStartingContent, posts: posts});
})
app.get('/about', function(req, res){
  res.render('about', { mainContentA :aboutContent });
})
app.get('/contact', function(req, res){
  res.render('contact', { mainContentC :contactContent });
})
app.get('/compose', function(req, res){
  res.render('compose');
})

app.post('/compose', function(req, res){
  const post = {
    title: req.body.postTitle,
    body: req.body.postbody
  };
  posts.push(post);
  res.redirect('/');
});

app.get('/posts/:postname', function(req, res){
  var value = _.lowerCase(req.params.postname);
  posts.forEach(function(post){
    var standValue = _.lowerCase(post.title);

  if(value === standValue){
    res.render('post',{
      title:post.title,
      content:post.body
    });
  }
  });
})

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
