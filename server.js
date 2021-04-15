const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/User");
const Quiz = require("./models/Quiz");
const withAuth = require("./middleware");
const { db } = require("./models/User");

const app = express();

const secret = "mysecretsshhh";

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//app.use(bodyParser.json());
app.use(cookieParser());

//const mongo_uri = "mongodb://localhost:27020/react-auth";
const uri =
  "mongodb+srv://DanF:aurumaquila88@cluster0.rocxy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },

  function (err) {
    if (err) {
      throw err;
    } else {
      console.log(`Successfully connected to ${uri}`);
    }
  }
);
var ObjectID = require("mongodb").ObjectID;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.sendFile(
    path.join(__dirname, "public", "index.html")
  );
});

app.get("/api/home", function (req, res) {
  res.send("Welcome!");
});

app.get("/api/secret", withAuth, function (req, res) {
  res.send("The password is potato");
});

app.post("/quiz/:id", function (req, res) {
  console.log(req.body, "bodacious!");
  //res.send("Hello, " + req.params.id + ".");
  //res.redirect(`/quiz/${req.params.id}`);
  return res.redirect("/");
});
app.post("/api/register", function (req, res) {
  const { email, password } = req.body;
  console.log(req.body, " heee", { email, password });
  const user = new User({ email, password });
  user.save(function (err) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send(
          "Error registering new user please try again."
        );
    } else {
      res.status(200).send("Welcome to the club!");
    }
  });
});

app.post("/dingus/dongle", function (req, res) {
  Quiz.find({}, function (err, qz) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else {
      res.send(qz);
    }
  });
});

app.post("/dingus/dingle", function (req, res) {
  console.log(req.body.Email, " Yurr");
  let em = req.body.Email;
  Quiz.find({ email: { $eq: em } }, function (err, qz) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error do try again",
      });
    } else {
      res.send(qz);
    }
  });
});

app.post("/dingus/derngle", function (req, res) {
  console.log(req.body.id, " Igbo");
  Quiz.findOne(
    { _id: { $eq: req.body.id } },
    function (err, result) {
      if (err) {
        console.err(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.delete("/dingus/delgle", function (req, res) {
  console.log(req.body, " Yoruba");
  const _id = new ObjectID(req.body.Id);
  Quiz.deleteOne(
    { _id: { $eq: req.body.Id } },
    function (err, result) {
      if (err) {
        console.err(err);
      } else {
        res.json(result);
      }
    }
  );
});

app.post("/api/authenticate", function (req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function (err, user) {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "Internal error please try again",
      });
    } else if (!user) {
      res.status(401).json({
        error: "Incorrect email or password",
      });
    } else {
      user.isCorrectPassword(
        password,
        function (err, same) {
          if (err) {
            res.status(500).json({
              error: "Internal error please try again",
            });
          } else if (!same) {
            res.status(401).json({
              error: "Incorrect email or password",
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: "1h",
            });
            console.log(token, "Smoker");
            res
              .cookie("token", token, {
                httpOnly: true,
              })
              .sendStatus(200);
          }
        }
      );
    }
  });
});

app.post("/dingus", (req, res) => {
  const { questions, name, email } = req.body;
  //console.log(JSON.stringify(req));
  //const name = "bingo";
  // const thing = "bango";
  console.log(questions, name, "nombre");
  let qz = new Quiz({ questions, name, email });
  qz.save(function (err) {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send(
          "Error registering new quiz please try again."
        );
    } else {
      //res.status(200).send("Welcome to the quizClub!");
    }
  });
  console.log(qz, " hooo");
  res.sendStatus(200);
  //next();
});

app.post("/dengus", (req, res) => {
  // const { id } = req.body;
  const { id, questions, name, email } = req.body;
  //console.log(JSON.stringify(req));
  //const name = "bingo";
  // const thing = "bango";
  let qz = new Quiz({ questions, name, email });
  //console.log(qz, " woo");
  //console.log(Quiz.findOne({ id: { $eq: id } }));
  Quiz.updateOne(
    { _id: { $eq: id } },
    {
      $set: {
        questions: questions,
        name: name,
        //email: email,
      },
    }
  ).then((result) => {
    res.status(200).json({ message: "Update successful!" });
  });

  //res.sendStatus(200);
  //next();
});

app.get("/checkToken", withAuth, function (req, res) {
  res.sendStatus(200);
});

app.listen(3010, () => {
  console.log("App listening on 3010");
});
