$(document).ready( function() {
    var email;

    chrome.runtime.sendMessage({command: "email"}, function(response) {
        email = response.email;
        console.log(email);
    });

  //Get number of notifications
  chrome.browserAction.getBadgeText({}, function(res) {
    console.log(res);
    if (res) {
      var recentTab = $(".tab[data-type='Recent'], .tab[data-type='Errors'] ").append('<div class="notif-badge">'+res+'</div>');
      var badge = recentTab.find(".notif-badge");
      badge.css("margin-left", -badge.width() / 2 - 3);
    }
  });

  //Clear badge of any number
  chrome.browserAction.setBadgeText({text:String("")});

  setTimeout(function(){ $(".notif-badge").fadeOut(500) }, 5000);

  var fb = new Firebase('https://brilliant-fire-8245.firebaseio.com/users/andrewmillman35@gmail,com');
  fb.once('value', function(snapshot) {
    var all = snapshot.val();
    for (item in all) {
      console.log(all[item]);
    }
  })





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

  $("#save-button").on('click',function(){
    console.log("running");
    var title = $("#title").val();
    var timeDropdown = $("#time-dropdown").find(":selected").text();
    var time = $("#time").val();
    var location = $("#location").val();
    console.log("You typed: " + title + ", " + timeDropdown + ", " + location);
    $(".edit-item-modal, .transparent-overlay").removeClass("open");
  });
});

function checkUserInput(val){
 var element=$("#time");
 if(val=='Custom')
   element.addClass("open");
 else
   element.removeClass("open");
}