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