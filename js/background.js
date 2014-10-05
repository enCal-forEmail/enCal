
var notifs = 0;
var BASE_URL = "http://2784b8e6.ngrok.com";

var user_email;
var user_email_comma;
var current_token;

var fb;


if (current_token) {
  chrome.identity.removeCachedAuthToken({ token: current_token }, function(){});

  // Make a request to revoke token in the server
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://accounts.google.com/o/oauth2/revoke?token=' +
           current_token);
  xhr.send();

  current_token = 0;
  console.log("Revoked token.")
}

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
    //changeState(STATE_START);
  } else {
    current_token = token;
    console.log('Token acquired:' + current_token +
      '. See chrome://identity-internals for details.');

    //GET the user's email
    $.ajax({
      method: 'GET',
      url: "https://www.googleapis.com/oauth2/v1/userinfo",
      data: {
        "alt": "json",
        "access_token": current_token
      },
      success: function(data) {
        user_email = data.email;
        user_email_comma = user_email.replace('.',',')
        console.log(user_email_comma);

        //User authentication with our server
        $.post(
          BASE_URL + "/login",
          {
            email: user_email,
            accessToken: current_token
          },
          function(data) {
            console.log("logged in")
            connectFirebase();
          }
        );
      }
    });
  }
});

function connectFirebase() {
  fb = new Firebase('https://brilliant-fire-8245.firebaseio.com/users/' + user_email_comma);
  console.log("Firebase connected");
  fb.on('child_added', function (snapshot) {
    notifs++;
    console.log("up1");
    chrome.browserAction.setBadgeText({text:String(notifs)});
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });

    var child= snapshot.val();

    console.log(child);

  }, function (errorObject) {
    console.log('The read failed: ' + errorObject.code);
  });

  /*var user = fb.child('users').child('user_email_comma');
  user.child().set({
    isNew: "1"
  });
  console.log(user.child("JYWQME5SoQj10E3OF4k")); */
}







