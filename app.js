const express = require("express"),
  app = express(),
  flash = require("connect-flash"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  methodOverride = require("method-override"),
  LocalStrategy = require("passport-local"),
  Cheese = require("./models/cheeses"),
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
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/catalogue", (req, res) => {
  Cheese.find({}, (err, allCheeses) => {
    if (err) {
      console.log(err);
    } else {
      res.render("catalogue", {
        cheeses: allCheeses
      });
    }
  });
});

app.post("/catalogue", (req, res) => {
  let name = req.body.name;
  let image = req.body.image;
  let newCheese = {
    name: name,
    image: image
  };
  //Make a new cheese and save to db
  Cheese.create(newCheese, (err, newlyCreated) => {
    if (err) {
      console.log(err);
    } else {
      //redirect back to catalogue
      res.redirect("/catalogue");
    }
  });
});

//So the owner can add more cheese to the catalogue
app.get("/catalogue/new", (req, res) => {
  res.render("new.ejs");
});

app.get("/show", (req, res) => {
  res.render("show");
});

app.get("/login", (req, res) => {
  res.render("login");
});

//handle login logic
app.post("/login", (req, res) => {
  res.redirect("/landing");
});

// logout route
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/landing");
});

app.get("/register", (req, res) => {
  res.render("register");
});

//Handle sign up logic
app.post("/register", (req, res) => {
  let newUser = new User({
    username: req.body.username
  });
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err.message);
      return res.redirect("/register");
    }
    passport.authenticate("local")(req, res, () => {
      console.log("login successful");
      res.redirect("/landing");
    });
  });
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