var i = 0;
window.setInterval(function() {
  chrome.browserAction.setBadgeText({text:String(i)});
  chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
  i++;
}, 10000);
