// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );


    // Check if any data is in local storage or assign empty array
    const localStorageArray = JSON.parse(localStorage.getItem("localStorageArray")) || [];


    // Listener event for the search submit
    $("#search-btn").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        // Store search city in an array and save to local storage.
        localStorageArray.unshift($("#search-input").val())
        console.log(localStorageArray)
        localStorage.setItem("storedArray", JSON.stringify(localStorageArray));
    })


});
