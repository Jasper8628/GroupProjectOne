$("#advancedSearch").click(function(){
    openAdvancedSearchModal();
});
$( ".close-btn").click(function(){
    closeModal();
});

function openAdvancedSearchModal(){
    $(".modal").css("display","block");
}
function closeModal(){
    $(".modal").css("display","none");
}

function openNav() {
    document.getElementById("mySidebar").style.width = "350px";
    document.getElementById("mySidebar").style.marginTop="70px";
    document.getElementById("collection").style.marginRight = "350px";
  }

  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("collection").style.marginRight = "auto";
  }
  