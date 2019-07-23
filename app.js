const express = require("express"),
  app = express(),
  flash = require("connect-flash"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local"),
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

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/catalogue", (req, res) => {
  res.render("catalogue");
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
