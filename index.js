const express = require("express");
const app = express();
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');

const port = process.env.YOUR_PORT || 3000;
const path = require("path");


app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

 

// fake data base made by pilu
let posts = [
  {
    id: uuidv4(),
    username: "pilubhai",
    content: "hello bachoo Good Morning.",
  },
  {
    id: uuidv4(),
    username: "bulubhai",
    content: "hello this is bulu . ",
  },
  {
    id: uuidv4(),
    username: "becians",
    content: "i am from bec college. ",
  },
  {
    id: uuidv4(),
    username: "giftian",
    content: "i am from gift college. ",
  },
];


app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("form.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  // console.log(req.body); // for printing terminal or bash
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  // console.log(post); // for print id
  res.render("singlepost.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
//   console.log(post);  for print edit post
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});


app.listen(port, (req, res) => {
  console.log(`listening port ${port}.`);
});
