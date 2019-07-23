const express = require("express"),
  app = express(),
  flash = require("connect-flash"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local"),
  Cheese = require("./models/cheeses"),
  Comment = require("./models/comments"),
  User = require("./models/users");

mongoose
  .connect(
    "mongodb+srv://SodaCode:!Kdh4lyfe@cheese-shop-31dcw.mongodb.net/test?retryWrites=true&w=majority",
    () => {
      console.log("Connected to DB");
    }
  )
  .catch(err => {
    console.log("Error:" + err.message);
  });

let cheeses = [
  {
    name: "Swiss",
    image:
      "http://cdn.shopify.com/s/files/1/0150/0232/products/Pearl_Valley_Swiss_Slices_36762caf-0757-45d2-91f0-424bcacc9892_grande.jpg?v=1534871055"
  }
];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/catalogue", (req, res) => {
  res.render("catalogue", { cheeses: cheeses });
});

app.post("/catalogue", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newCheese = { name: name, image: image };
  cheeses.push(newCheese);
  //redirect back to catalogue
  res.redirect("/catalogue");
});

app.get("/catalogue/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/cart", (req, res) => {
  res.render("cart");
});

app.get("/checkout", (req, res) => {
  res.render("checkout");
});

app.listen(3000, () => {
  console.log("Site server started");
});
