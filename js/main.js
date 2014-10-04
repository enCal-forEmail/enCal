$(document).ready( function() {

  $(".tab").on("click", function() {
    var contentType = $(this).data("type");
    var selectedContent = $(".tab-content[data-type='" + contentType + "']");
    $(".tab, .tab-content").removeClass("active");
    $(this).addClass("active");
    selectedContent.addClass("active");
  });

  $(".conflict-item .edit-button").on("click", function() {
    $(".edit-item-modal, .transparent-overlay").addClass("open");

    $(".transparent-overlay").on("click", function() {
      $(".edit-item-modal, .transparent-overlay").removeClass("open");
    });
  });

});

function checkUserInput(val){
 var element=document.getElementById('time');
 if(val=='Custom')
   element.style.display='block';
 else
   element.style.display='none';
}