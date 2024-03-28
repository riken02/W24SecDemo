global.loggedIn = null;
const PORT = process.env.PORT;
//Module
const express = require("express");
const ejs = require("ejs");
const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");
const fileUpload = require("express-fileupload");
const path = require("path");
const expressSession = require("express-session");

//Controllers::
const homeController = require("./controllers/home");
const contactController = require("./controllers/contact");
const postStoreController = require("./controllers/postStore");

const registerController = require("./controllers/registre");
const storeUserController = require("./controllers/userStore");
const loginUserController = require("./controllers/userLogin");

const loginController = require("./controllers/login");
const userLogoutController = require("./controllers/logout");
const postByUserController = require("./controllers/postByUser");

//MiddWare:::
const ValidationMiddleware = require("./middlewares/validation");
const authMiddleware = require("./middlewares/authMiddleware");
const redirectIf = require("./middlewares/redirectIfAuthMiddleware");
//Application
const app = express();
//Mid ware
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

app.use(
  expressSession({
    secret: "This is session",
    resave: true,
    saveUninitialized: true,
  })
);

app.use("*", (req, res, next) => {
  loggedIn = req.session.userId;
  next();
});
const Validation = (req, res, next) => {
  console.log("Miidware called!!!");
  next();
};

app.use(Validation);
// Connection to MongoDB
try {
  // const connectionString = "mongodb+srv://F23FullStack:vU0onvCHH5gKogkT@cluster0.p1tk2rw.mongodb.net/";
  const connectionString =
    // "mongodb+srv://riten:riten@riten.ynnac1s.mongodb.net/";
    "mongodb+srv://riten:Prakash8128@riten.ynnac1s.mongodb.net/";

  mongoose.connect(connectionString);
} catch (err) {
  console.log("MongoDb Not Connected!!!");
}
//get Routes:
// 1. index or root
app.get("/", homeController);
//2.Contact
app.get("/contact", contactController);
//3.About
app.get("/about", (req, res) => {
  res.render("about");
});
//5. get route for create a post:
app.get("/post/new", authMiddleware, (req, res) => {
  // if (req.session.userId) {
  return res.render("create", { createPost: true });

  // }
  // res.redirect('/login')
});
//4.post page
app.get("/post/:id", async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  res.render("post", { post });
});

app.get("/register", redirectIf, registerController);
//7. login
app.get("/login", loginController);

app.get("/logout", userLogoutController);
app.post("/user/login", redirectIf, loginUserController);

//6. Post route for create a post

app.post("/post/store", ValidationMiddleware, postStoreController);

app.post("/user/store", redirectIf, storeUserController);
app.use((req, res) => {
  res.render("notFound");
});
app.get("/post/user/:id", postByUserController);
app.get("/note", (res, req) => {
  res.render("/post");
});

app.listen(PORT, () => {
  // console.log(`Appliaction Link : http://localhost:4000/`);
  console.log(`Running on : ${PORT}`);
});
