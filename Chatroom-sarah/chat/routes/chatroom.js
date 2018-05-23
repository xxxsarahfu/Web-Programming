var express = require("express");
var router = express.Router();
var path = require("path");
var chatroomAction = require("../util/chatroomAction.js");
// var lobbyAction = require("../util/lobbyAction.js");
router.use(express.static(path.resolve("public")));

router.get("/:chatid", function(req, res, next) {
  // var tmp = req.param.chatid;
  var userName = req.params.chatid.split("---")[0];
  var [from, to] = req.params.chatid.split("---");
  console.log("userName=", userName);
  // res.render("chatroom", { to: to });
  res.render("chatroom", req.app.chatroomAction["getGroupList"](userName, to));
});

router.post("/:chatid", function(req, res, next) {
  var userName = req.params.chatid.split("---")[0];
  // var userName = req.params.userName;
  var { groupName, action, friendList } = req.body;
  console.log("req.body: ", req.body);
  friendList = friendList.split(",");

  var response = {
    message: req.app.chatroomAction[action](userName, groupName, friendList),
    nextUrl: req.originalUrl
  };

  switch (response.message) {
    case "added already":
    case "add successful":
    case "name not found":
      res.json(response);
      break;
    default:
      console.log("already redirect!");
      res.redirect(path.resolve("/chatroom/:chatid", response.message));
      break;
  }
});
// end of lobby.js

router.setSocketio = function(app, io) {
  io.on("connection", function(socket) {
    socket.on("connectTo", function(msg) {
      socket.join(msg.roomName);
      socket.emit(
        "old message",
        app.chatroomAction["getOldMessage"](msg.from, msg.to)
      );
    });

    socket.on("chat message", function(msg) {
      io
        .to(msg.roomName)
        .emit(
          "chat message",
          app.chatroomAction["storeMessage"](msg.from, msg.to, msg.content)
        );
    });
  });
};

//new added from lobby.js

module.exports = router;
