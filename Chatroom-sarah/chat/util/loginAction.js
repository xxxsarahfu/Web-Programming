module.exports = function(app) {
  return {
    app: app,
    checkLogin: function(userName, password) {
      if (!(userName in this.app.register)) return "not register";
      if (this.app.register[userName] !== password) return "wrong password";
      return "login successful";
    },
    checkRegister: function(userName, password) {
      if (userName in this.app.register) return "name used";
      this.app.register[userName] = password;
      var groupList = (this.app.messageList[userName] = {});
      groupList[userName] = [
        {
          from: userName,
          to: userName,
          content: "You are connected to yourself now, chat with you!",
          timestamp: new Date()
        }
      ];
      return "register successful";
    }
  };
};
