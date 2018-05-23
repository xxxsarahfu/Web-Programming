var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var error = require("./routes/error");
var chatroom = require("./routes/chatroom");
var login = require("./routes/login");
// var lobby = require("./routes/lobby");

var loginAction = require("./util/loginAction");
// var lobbyAction = require("./util/lobbyAction");
var chatroomAction = require("./util/chatroomAction");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// data
app.register = {};
app.messageList = {};

// actions
app.loginAction = loginAction(app);
// app.lobbyAction = lobbyAction(app);
app.chatroomAction = chatroomAction(app);

app.use("/", login);
app.use("/login", login);
// app.use("/lobby", lobby);
app.use("/chatroom", chatroom);
app.use(error);

// set socketio
app.setSocketio = function(socketio) {
  chatroom.setSocketio(app, socketio);
};

module.exports = app;
