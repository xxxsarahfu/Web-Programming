module.exports = function(app) {
  return {
    app: app,
    storeMessage: function(from, to, content) {
      var app = this.app;
      var date = new Date();
      var newMessage = {
        from: from,
        to: to,
        content: content,
        timestamp: date
      };
      if (to.indexOf("--") === -1) {
        app.messageList[from][to].push(newMessage);
        if (from === to) return newMessage;
        app.messageList[to][from].push(newMessage);
      } else {
        var updateList = to.split("--")[1].split("-");
        updateList.forEach(function(userName, index, array) {
          app.messageList[userName][to].push(newMessage);
        });
      }
      return newMessage;
    },
    getOldMessage: function(from, to) {
      return this.app.messageList[from][to];
    },

    // new added from lobbyAction
    addGroup: function(userName, groupName, friendList) {
      var app = this.app;
      var nameNotExist = false;
      friendList.forEach(function(friendName, index, array) {
        console.log("FOREACH: ", friendName);
        if (!(friendName in app.register)) nameNotExist = true;
      });
      if (nameNotExist) return "name not found";

      friendList.push(userName);
      friendList.sort();

      var notGroup = friendList.indexOf(groupName) !== -1;
      var hashGroupName = notGroup
        ? groupName
        : groupName + "--" + friendList.join("-");

      var groups = app.messageList[userName];
      if (hashGroupName in groups) return "added already";

      var date = new Date();

      if (notGroup) {
        app.messageList[userName][hashGroupName] = [
          {
            from: hashGroupName,
            to: userName,
            content: "You are now connected with each other, chat now!",
            timestamp: date
          }
        ];
        app.messageList[hashGroupName][userName] = [
          {
            from: userName,
            to: hashGroupName,
            content: "You are now connected with each other, chat now!",
            timestamp: date
          }
        ];
        return "add successful";
      }

      friendList.forEach(function(userName, index, array) {
        var messages = (app.messageList[userName][hashGroupName] = []);
        friendList.forEach(function(friendName, index, array) {
          messages.push({
            from: friendName,
            to: hashGroupName,
            content: "You are now connected with each other, chat now!",
            timestamp: date
          });
        });
      });
      return "add successful";
    },
    getGroupList: function(userName, to) {
      var app = this.app;
      console.log(
        "msgList[username]: ",
        Object.keys(app.messageList[userName])
      );
      return { to: to, groups: Object.keys(app.messageList[userName]) };
    },
    chatGroup: function(userName, groupName) {
      return userName + "---" + groupName;
    }
  };
};
