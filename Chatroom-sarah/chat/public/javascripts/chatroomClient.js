$(function() {
  var [userName, groupName] = window.location.pathname
    .split("/")
    .slice(-1)[0]
    .split("---");
  var notGroup = groupName.indexOf("--") === -1;
  var roomName = notGroup ? [userName, groupName].sort().join("-") : groupName;
  var socket = io();

  function displayMessage() {
    var messageContainer = $('<div class="message-container">');
    var contentmsg = $('<h4 class="contentmsg">').text(this.content);
    var whospeak = $('<a class="text-gray">').text(" " + this.from + " ");
    var time = $('<p class="text-gray" style="font-size:10px">').text(
      this.timestamp
    );
    messageContainer.append(contentmsg);
    messageContainer.append(whospeak);
    messageContainer.append(time);

    var listItem = $('<li class="msglist-group-item">');
    if (this.from === userName) {
      var mymsc = $('<div class="message-container">');
      mymsc.append(whospeak);
      mymsc.append(contentmsg);
      mymsc.append(time);
      messageContainer = mymsc;
      messageContainer.addClass("text-right");
      contentmsg.addClass("bg-mymsg");
    }

    listItem.append(messageContainer);
    $(".msglist-group").append(listItem);

    window.scrollTo(0, document.body.scrollHeight);
  }

  socket.on("connect", function() {
    socket.emit("connectTo", {
      roomName: roomName,
      from: userName,
      to: groupName
    });
  });

  $("form").submit(function() {
    var content = $("#message").val();

    if (!$.trim(content)) return false;

    socket.emit("chat message", {
      roomName: roomName,
      from: userName,
      to: groupName,
      content: content
    });

    $("#message").val("");
    return false;
  });

  socket.on("old message", function(msg) {
    $(msg).each(displayMessage);
  });

  socket.on("chat message", function(msg) {
    displayMessage.call(msg);
  });

  // added from lobbyClient.js
  $("#add-friend-btn").on("click", function() {
    var groupName = $('input[name="groupName"]').val();
    var action = "addGroup";

    var request = {
      groupName: groupName,
      action: action,
      friendList: groupName
    };

    $.post(window.location.href, request).done(function(response) {
      window.location.replace(response.nextUrl);
      alert(response.message);
    });
  });

  $("#add-group-btn").on("click", function() {
    var groupName = $('input[name="groupName"]').val();
    var action = "addGroup";

    var friendList = prompt("invite:");
    friendList = friendList.split(" ").join(",");

    var request = {
      groupName: groupName,
      action: action,
      friendList: friendList
    };

    $.post(window.location.href, request).done(function(response) {
      window.location.replace(response.nextUrl);
      alert(response.message);
    });
  });

  $(".friend-item").on("click", function() {
    console.log("Click!");
    var groupName = $(this)
      .find("form .name") //role="form, class="name""
      .html();

    var submitForm = $(this).find("form");
    var action = $("<input>")
      .attr("type", "hidden")
      .attr("name", "action")
      .val("chatGroup");
    var group = $("<input>")
      .attr("type", "hidden")
      .attr("name", "groupName")
      .val(groupName);
    var friendList = $("<input>")
      .attr("type", "hidden")
      .attr("name", "friendList")
      .val(groupName);

    submitForm.append($(group));
    submitForm.append($(action));
    submitForm.append($(friendList));
    submitForm.submit();
  });
});
