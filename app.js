//jshint esversion:6

//  go to /compose to add new posts.

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to my blog";
const aboutContent = `Hi. My name is Ewan. I am a 3rd year Computer Science student at UBC. I built this blog webapp for creators to update their blog posts without knowing any code.
                      Feel free to add and delete posts, just make you keep them appropriate.`


const contactContent = "My email is wang95098@gmail.com. I am open to coop and internships. Feel free to contact me if you see room for us to work together or just wanna say hi.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Load the full build.
const _ = require('lodash');




var posts = [];
var errorMsg = '';



app.get("/", function (req, res) {
  res.render("home", { startingContent: homeStartingContent, posts: posts});
})

app.get("/about", function (req, res) {
  res.render("about", { content: aboutContent });
})

app.get("/contact", function (req, res) {
  res.render("contact", { content: contactContent });
})


app.get("/compose", function (req, res) {
  res.render("compose");
})

app.post("/compose", function (req, res) {
  // handle deletePost
  if (req.body.postTitle == null) {
    posts.forEach(function (post) {
      if (post.title == req.body.postToDelete) {
        const index = posts.indexOf(post);
        posts.splice(index,1);
      } else {
        errorMsg = "Sorry the post you ask to be deleted cannot be found. Please try again";
      }
    })
  }else{
    const post = {
      title: req.body.postTitle,
      body: req.body.postBody
    };
    posts.push(post);
  }
  res.redirect("/");
})


app.get("/posts/:postTitle", function (req, res) {
  var requestedTitle = _.lowerCase(req.params.postTitle);


  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", { requestedPost: post });
    }
  })

})


app.listen(process.env.PORT || 3000, function () {
  console.log("Server started on port 3000");
});
