$(document).ready( function() {

  $(".tab").on("click", function() {
    var contentType = $(this).data("type");
    console.log(contentType);
    var selectedContent = $(".tab-content[data-type='" + contentType + "']");
    $(".tab, .tab-content").removeClass("active");
    $(this).addClass("active");
    selectedContent.addClass("active");
  });

});