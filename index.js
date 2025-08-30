const express = require("express");
const app = express();
require("dotenv").config();



const port =process.env.YOUR_PORT || 3000;

// fake data base made by pilu 
let posts = [
    {
        username: "pilubhai",
        Content: "hello this is a Quora. posted by pilu "
    },
    {
        username: "bulubhai",
        Content: "hello this is bulu . "
    },
    {
        username: "becians",
        Content: "i am from bec college. "
    },
    {
        username: "giftian",
        Content: "i am from gift college. "
    }
]

const path = require("path"); 
// 'path' is a Node.js core module. 
// It helps us work with file and directory paths in a cross-platform way (Windows/Linux/Mac).

app.use(express.urlencoded({ extended: true }));  
// This middleware parses incoming requests with form data (application/x-www-form-urlencoded).
// 'extended: true' means it can parse nested objects (using qs library).
// Example: if you submit a form with POST, this lets you access data via req.body.

app.set("view engine", "ejs");  
// This tells Express to use 'EJS' (Embedded JavaScript) as the template/view engine.
// With this, you can render .ejs files located inside the 'views' folder by default.

app.set("views", path.join(__dirname, "views"));
// That would serve static files (CSS, JS, images, etc.) from the 'views' folder.
// But usually, we don’t store static files in "views". We keep them in "public".

app.use(express.static(path.join(__dirname, "public")));

// That will serve all static files (CSS, JS, images) from the 'public' folder.


app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts });
})

app.get("/posts/new", (req, res) => {
    res.render("form.ejs");
})

app.post("/posts", (req, res) => {
    let  {username, Content} = req.body;
    posts.push({username, Content});
    // console.log(req.body); // for printing terminal or bash
    res.redirect("/posts");
})

app.listen(port, (req, res) => {
    console.log(`listening port ${port}.`);
});