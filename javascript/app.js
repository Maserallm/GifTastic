let gifContainer = [
  "loud",
  "thinking",
  "running",
  "exhausted",
  "broke",
  "burned out",
  "coding"
];
const apiKey = "&api_key=jbGLFe0vcmIZQJpZtYbTkv2FW7Dq0a1G&limit=10";
const giphyUrl = "https://api.giphy.com/v1/gifs/search?q=";
let userSearch;

function renderButtons() {
  $("#gif-buttons").text("");

  for (let i = 0; i < gifContainer.length; i++) {
    let button = $("<button>");
    button.addClass("giphy m-1 btn btn-outline-dark");
    button.attr("data-name", gifContainer[i]);
    // button.attr("class", "m-1 btn btn-outline-dark");
    button.text(gifContainer[i]);
    button.appendTo("#gif-buttons");
    console.log(gifContainer[i]);
  }
}
renderButtons();

$("#add-gif").on("click", function(event) {
  event.preventDefault();

  userInput = $("#user-input")
    .val()
    .trim();
  console.log(userInput);

  gifContainer.push(userInput);
  $("<button>")
    .html(userInput)
    .addClass("giphy m-1 btn btn-outline-dark")
    .attr("data-name", userInput)
    .appendTo("#gif-buttons");
});

$(document).on("click", ".giphy", function() {
  let giphy = $(this).attr("data-name");

  let queryUrl = giphyUrl + giphy + apiKey;

  console.log(giphy);

  $.ajax({
    url: queryUrl,
    method: "GET"
  }).then(function(response) {
    console.log(response);

    let results = response.data;

    for (var i = 0; i < results.length; i++) {
      let still = results[i].images.downsized.url;
      let animate = results[i].images.downsized_still.url;
      let rating = results[i].rating;

      console.table(results[i].rating);

      let p = $("<p>").text("Rating: " + rating.toUpperCase());

      let giphyDiv = $("<div>");

      let giphyImg = $("<img>");
      giphyImg.addClass("gif-choice");
      giphyImg.attr("src", still);
      giphyImg.attr("data-state", "still");
      giphyImg.attr("data-animate", animate);
      giphyImg.attr("data-still", still);

      giphyImg.appendTo(giphyDiv);
      p.appendTo(giphyDiv);

      $("#gif-display").prepend(giphyDiv);
    }
  });
});

$(document).on("click", ".gif-choice", function() {
  let state = $(this).attr("data-state");

  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});
