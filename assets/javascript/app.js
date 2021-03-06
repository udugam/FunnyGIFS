
var gifs = {
    searches: localStorage.getItem("savedSearches") ? JSON.parse(localStorage.getItem("savedSearches")) : ["fails", "bloopers", "laughing"],
    favs: localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : []
}

var utilities = {
    apiEndpoint: 'https://api.giphy.com/v1/gifs/',
    apiKey: 'DiPlXGeORzdsWmWTvkAKFRVvjcAm5idS',
    search: function(searchTerm,numResults) {
        var queryUrl = this.apiEndpoint+'search?'+'api_key='+this.apiKey+'&q='+searchTerm+'&limit='+numResults+"&rating=G"
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response) {
            utilities.renderResults(response,".searchResults")
            sessionStorage.setItem("searchTerm", searchTerm);
        }) 
    },
    searchID: function(id,divName) {
        var queryUrl = this.apiEndpoint+id+'?api_key='+this.apiKey
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response) {
            this.renderResults(response,divName)
        }) 
    },
    renderResults: function(response,divName) {
        $(divName).empty();
        response.data.forEach(function(element) {
            var imageContainer = $("<div>");
            var image = $("<img>");
            var actions = $("<div>");
            var rating = $("<h5>");
            var favButton = $("<button>");
            imageContainer.append(image,actions,rating);
            
            //Adding styling classes to imageContainer
            imageContainer.addClass("col-md-4"); //Adding bootstrap responsive classes
            imageContainer.addClass("image-container");

            //Constructing the favourite button
            favButton.text("Add To Favourites");
            favButton.addClass("addFavourite")
            favButton.attr("data-response", JSON.stringify(element));

            //Adding the favourite button to the actions div 
            actions.append(favButton);

            //Adding the rating to the Gif
            rating.text("Rating: "+ element.rating.toUpperCase())

            //Adding atrributes and styling classes to image
            image.addClass("img-fluid"); //Adds Bootstrap specific class for styling
            image.addClass("gif");
            image.attr("data-still", element.images.fixed_height_still.url);
            image.attr("src", element.images.fixed_height_still.url);
            image.attr("data-animate", element.images.fixed_height.url);
            image.attr("data-state", "still");
            
            $(divName).append(imageContainer);
        })
    },
    renderButtons: function(array, divName) {
        $(divName).empty();
        array.forEach(function(element) {
            var button = $("<button>");
            button.addClass("savedGifs");
            button.text(element);
            $(divName).append(button)
        })
    },
    renderFavs: function(array, divName) {
        $(divName).empty();
        array.forEach(function(element, index) {
            var imageContainer = $("<div>");
            var image = $("<img>");
            var actions = $("<div>");
            var delButton = $("<button>");
            var rating = $("<h5>");
            imageContainer.append(image,actions,rating);
            
            //Adding styling classes to imageContainer
            imageContainer.addClass("col-md-4"); //Adding bootstrap responsive classes
            imageContainer.addClass("image-container");

            //Constructing the delete button
            delButton.text("Delete From Favourites");
            delButton.addClass("delFavourite");
            delButton.attr("data-index", index);

            //Adding the rating to the Gif
            rating.text("Rating: "+ element.rating.toUpperCase())

            //Adding the favourite button to the actions div 
            actions.append(delButton);

            //Adding atrributes and styling classes to image
            image.addClass("img-fluid"); //Adds Bootstrap specific class for styling
            image.addClass("gif");
            image.attr("data-still", element.images.fixed_height_still.url);
            image.attr("src", element.images.fixed_height_still.url);
            image.attr("data-animate", element.images.fixed_height.url);
            image.attr("data-state", "still");
            $(divName).append(imageContainer);
        })
    },
    newTopic: function(topicName,searchesArray) {
        searchesArray.includes(topicName) ? null : searchesArray.push(topicName);
        localStorage.setItem("savedSearches", JSON.stringify(gifs.searches));
    },
    unfreeze: function(image) {
        $(image).attr("src", $(image).attr("data-animate"));
        $(image).attr("data-state", "animate");
    },
    freeze: function(image) {
        $(image).attr("src", $(image).attr("data-still"));
        $(image).attr("data-state", "still");
    },
    addToFavourites: function(imageDiv) {
       //Add condition for multiple click behavior
        gifs.favs.push(JSON.parse(imageDiv));
        localStorage.setItem("favourites",JSON.stringify(gifs.favs));
    },
    removeFromFavs: function(index,favsArray) {
        favsArray.splice(parseInt(index),1);
        utilities.renderFavs(gifs.favs,".favs");
        localStorage.setItem("favourites", JSON.stringify(gifs.favs));

    }
}


//Events
$(document).ready(function() {
    //Load buttons
    utilities.renderButtons(gifs.searches,".buttons")

    //Saves searchTerm to searches array
    $("#saveSearch").on("click", function() {
        var input = $("#user-input").val().trim();
        if (input!="") {
            utilities.newTopic(sessionStorage.getItem("searchTerm"),gifs.searches);
            utilities.renderButtons(gifs.searches, ".buttons");
        }
    })
    
    $("body").on("click", ".savedGifs", function() {
        var input = $(this).text();
        utilities.search(input,21);
    })

    //This event freezes of unfreezes the gif on click
    $("body").on("click", ".gif", function() {
        ($(this).attr("data-state")==="still") ? utilities.unfreeze($(this)) : utilities.freeze($(this))
    })

    //This event calls on the add to favourtie method whent the button is clicked
    $("body").on("click", ".addFavourite", function() {
        utilities.addToFavourites($(this).attr("data-response"));
    })

    //This event calls on the search method when the search button is clicked
    $("body").on("click", "#search", function() {
        var input = $("#user-input").val();
        utilities.search(input,21);
    })

    //This event deletes a gif from the favourties array whent he delete button is clicked
    $("body").on("click", '.delFavourite', function () {
        utilities.removeFromFavs($(this).attr("data-index"),gifs.favs)
    })
})



