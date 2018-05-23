$(function() {
  function clickAction(action) {
    var userName = $('input[name="userName"]').val();
    var password = $('input[name="password"]').val();
    var action = action;

    var request = {
      userName: userName,
      password: password,
      action: action
    };

    $.post(window.location.href, request).done(function(response) {
      window.location.replace(response.nextUrl);
      alert(response.message);
    });
  }

  $("#login-btn").on("click", function(event) {
    clickAction("checkLogin");
  });

  $("#register-btn").on("click", function() {
    clickAction("checkRegister");
  });
});
