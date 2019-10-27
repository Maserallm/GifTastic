let gifContainer = ["loud", "thinking", "running", "exhausted", "broke", "burned out", "coding"];
const apiKey = "&api_key=jbGLFe0vcmIZQJpZtYbTkv2FW7Dq0a1G&limit=10";
const giphyUrl = "http://api.giphy.com/v1/gifs/search?q=";
let userSearch;




function renderButtons() {

    $("#gif-buttons").text("")

    for (let i = 0; i < gifContainer.length; i++) {
    let button = $("<button>");
    button.addClass("giphy");
    button.attr("data-name", gifContainer[i])
    button.text(gifContainer[i]);
    button.appendTo("#gif-buttons");
        console.log(gifContainer[i]);
    }
}; renderButtons()

 $("#add-gif").on("click", function (){
    event.preventDefault();
   
    userInput = $("#user-input").val().trim();
    console.log(userInput);

    $("<button>").html(userInput)
        .addClass("giphy")
        .attr("data-name", userInput)
        .appendTo("#gif-buttons");
});

$(document).on("click", ".giphy", function () {

    let giphy = $(this).attr("data-name");

    let queryUrl = giphyUrl + giphy + apiKey;

    console.log(giphy);

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response)

        $("#")
    })
})
