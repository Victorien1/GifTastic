// global function
$( document ).ready(function() {

    //  array containing the list of entrepreneurs
    var topic = ["Jeff Bezos","Bill Gates","Warren Buffet","Steve Jobs","Sergey Brin","Elon Musk", "Mark Zuckerberg", "Larry Ellison", "Oprah Winfrey", "Larry Page","Michael Dell",];
    
    //function to display the buttons
    
    function displayGifButtons() {
        $("#gifButtonsView").empty();
        for (var i = 0; i < topic.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("entrepreneur");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topic[i]);
            gifButton.text(topic[i]);
            $("#gifButtonsView").append(gifButton);
        }
    }
    
    //function to add new button
    
    function addNewButton() {
        $("#addGif").on("click", function() {
            var entrepreneur = $("#topicInput").val().trim();
            if (entrepreneur == ""){
                return false;//
            }
            topic.push(entrepreneur);
    
            displayGifButtons();
            return false;
            });
    }
    
    //function to remove last button
    function removeLastButton() {
        $("removeGif").on("click", function() {
            topic.pop(entrepreneur);
            displayGifButtons();
            return false;
        });
    
    }
    
    // function that displays the gifs
    
    function displayGifs() {
        var entrepreneur = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + entrepreneur + "&api_key=YFZVnL0su5irNAjzE49iKVoKestC1JCk&limit=10";
        
        $.ajax({
            url: queryURL,
            method: 'GET'
        })
    
        .done(function(response) {
            $("#gifsView").empty();
            //show results of gifs
            var results = response.data;
            if (results == ""){
                alert("There is not a gif for this!");  
            }
            for (var i = 0; i<results.length; i++){
                //put gifs in a div
                var gifDiv = $("<div1>");
                //pull rating of gif
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);
    
                //pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //paused images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //animated images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                //how images come in, already paused
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //add new div to existing divs
                $("#gifsView").prepend(gifDiv);
            }
        });
    }
    
    
    //list of entrepreneurs created
    displayGifButtons();
    addNewButton();
    removeLastButton();
    
    
    
    //event listeners
    $(document).on("click", ".entrepreneur", displayGifs);
    $(document).on("click", ".image", function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else {
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }
    
        });
    
    });
    
