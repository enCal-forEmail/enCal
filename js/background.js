var i = 0;
window.setInterval(function() {

  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      changeState(STATE_START);
    } else {
      console.log('Token acquired:'+token+
        '. See chrome://identity-internals for details.');
      //changeState(STATE_AUTHTOKEN_ACQUIRED);
    }
  });

  chrome.browserAction.setBadgeText({text:String(i)});
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  i++;
}, 5000);
