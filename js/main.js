$(document).ready( function() {

  chrome.browserAction.getBadgeText({}, function(res) {
    console.log(res);
    if (res) {
      $(".tab[data-type='Recent'").append('<div class="notif-badge">'+res+'</div>');
    }
  });
  setTimeout(function(){ $(".notif-badge").fadeOut(500) }, 5000);

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

  $(".tab").on("click", function() {
    var contentType = $(this).data("type");
    var selectedContent = $(".tab-content[data-type='" + contentType + "']");
    $(".tab, .tab-content").removeClass("active");
    $(this).addClass("active");
    selectedContent.addClass("active");
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

$( window ).unload(function() {
  alert( "Bye now!" );
});
