const express = require("express");
const app = express();
const views = require("./views");
const models = require("./models")();
models.init();

const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
app.use(cookieParser("topsecretpasswordthatmaxlikes"));

app.post("/orders", views.createOrder);




app.get("/", (req, res) => {
	res.send({ message: "hello world" });
});
app.post("/createAccount", async (req,res)=>{
  if (!req.body.username || !req.body.password) {
      res.status(401).send({ hackers: "you get nothing" });
  }else{
      const generatedPassword= await (bcrypt.hash(req.body.password, 10));
  models.User.create({
      //req is information being sent to the server 
      //createAccount fetch method in app.js is passing the following information 
      username: req.body.username,
      password: generatedPassword,
  })
  }
  res.send({message:"user created"});
})
app.post("/login", async (req,res)=>{
  console.log(req.cookies);
  //checks if user is loged in
  if (req.cookies.userID){
      console.log("sign in sucessful. used a cookie");
      res.send("User is signed in");
  }else{
  //goes through the login process again
      const userDB=await models.User.findOne({
          where: {username: req.body.username}
      })
      //res.send make sure to always return something
      if (!userDB) {
          res.send({ error: "Can't sign in" });
      }else {
          const match = await (bcrypt.compare(req.body.password, userDB.password));
          if (match) {
              console.log("Sign In Success! but used a hash");
              console.log(userDB.id);
              //adds cookie if login is a success
              //gets user ID data from database- checks cookie parser- pull all the information in it
              res.cookie("userID", userDB.id).send({ message: "user is signed in" });
          } 
          else {
              res.send({ error: "Can't sign in" });
          }
      }
  }
});
//login checker is a middleware function. 
const loginChecker = async (req,res, next)=>{
  const userDB= await models.User.findOne({
      where: {username: req.body.username}
  })
  if (!userDB) {
  res.status(401).send({ error: "Can't sign in" });
} else {
      const match = await (bcrypt.compare(req.body.password, userDB.password));
  if (match) {
    next();
  }else {
    res.status(401).send({ error: "Can't sign in" });
  }
}
};
//middleware is a function that runs before a function in fron ot it. located after add.
app.post("/add", loginChecker, (req, res)=>{
  res.send({result: req.body.num1 + req.body.num2})
})
app.listen(5000, 
  console.log(`server is running! On port 5000`)
);

