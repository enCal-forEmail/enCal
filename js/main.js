$(document).ready( function() {

  $(".tab").on("click", function() {
    var contentType = $(this).data("type");
    var selectedContent = $(".tab-content[data-type='" + contentType + "']");
    $(".tab, .tab-content").removeClass("active");
    $(this).addClass("active");
    selectedContent.addClass("active");
  });

});

function checkUserInput(val){
 var element=document.getElementById('time');
 if(val=='Custom')
   element.style.display='block';
 else  
   element.style.display='none';
}