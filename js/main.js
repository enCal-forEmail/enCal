$(document).ready( function() {

  chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    if (chrome.runtime.lastError) {
      console.log(chrome.runtime.lastError);
      changeState(STATE_START);
    } else {
      console.log('Token acquired:'+token+
        '. See chrome://identity-internals for details.');
      changeState(STATE_AUTHTOKEN_ACQUIRED);
    }
  });

  chrome.browserAction.getBadgeText({}, function(res) {
    console.log(res);
    if (res) {
      var recentTab = $(".tab[data-type='Recent'").append('<div class="notif-badge">'+res+'</div>');
      var badge = recentTab.find(".notif-badge");
      badge.css("margin-left", -badge.width() / 2 - 3);
    }
  });
  setTimeout(function(){ $(".notif-badge").fadeOut(500) }, 5000);

chrome.browserAction.getBadgeText({}, function(res) {
    console.log(res);
    if (res) {
      var recentTab = $(".tab[data-type='Errors'").append('<div class="notif-badge">'+res+'</div>');
      var badge = recentTab.find(".notif-badge");
      badge.css("margin-left", -badge.width() / 2 - 3);
    }
  });
  setTimeout(function(){ $(".notif-badge").fadeOut(500) }, 5000);

  $(".tab").on("click", function() {
    var contentType = $(this).data("type");
    var selectedContent = $(".tab-content[data-type='" + contentType + "']");
    $(".tab, .tab-content").removeClass("active");
    $(".tab-underline").removeClass("Recent, Errors").addClass(contentType);
    $(this).addClass("active");
    selectedContent.addClass("active");
  });

  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: //left arrow key
        if ($(".tab-underline").hasClass("Errors")) {
          $(".tab-underline").removeClass("Recent, Errors").addClass("Recent");
          $(".tab, .tab-content").removeClass("active");
          $(".tab").first().addClass("active");
          $(".tab-content").first().addClass("active");
        }
        break;
      case 39: //right arrow key
        console.log("Asd");
        if ($(".tab-underline").hasClass("Recent")) {
          $(".tab-underline").removeClass("Recent, Errors").addClass("Errors");
          $(".tab, .tab-content").removeClass("active");
          $(".tab").last().addClass("active");
          $(".tab-content").last().addClass("active");
        }
        break;
    }

  });

  $(".conflict-item").on("click", function() {
    $(".edit-item-modal, .transparent-overlay").addClass("open");

    $(".transparent-overlay").on("click", function() {
      $(".edit-item-modal, .transparent-overlay").removeClass("open");
    });
  });

  $(".info-icon").on("click", function() {
    $(".about-modal, .transparent-overlay").addClass("open");

    $(".transparent-overlay").on("click", function() {
      $(".about-modal, .transparent-overlay").removeClass("open");
    });
  });

  $("select").on('change', function(){
    checkUserInput(this.value);
  });

$(".recent-item").hover(
  function() {
  }, function() {
    $(this).find(".recent-item-marker").fadeOut(500);
  });

});

function checkUserInput(val){
 var element=$("#time");
 if(val=='Custom')
   element.addClass("open");
 else
   element.removeClass("open");
}