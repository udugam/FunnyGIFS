
var gifs = {
    topics: ["weekend", "office", "coding"],
    favs: localStorage.getItem("favourites") ? JSON.parse(localStorage.getItem("favourites")) : []
}

var utilities = {
    apiEndpoint: 'https://api.giphy.com/v1/gifs/',
    apiKey: 'DiPlXGeORzdsWmWTvkAKFRVvjcAm5idS',
    search: function(searchTerm,numResults) {
        var queryUrl = this.apiEndpoint+'search?'+'api_key='+this.apiKey+'&q='+searchTerm+'&limit='+numResults
        $.ajax({
            url: queryUrl,
            method: 'GET'
        }).then(function(response) {
            utilities.renderResults(response,".searchResults")
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
        response.data.forEach(function(element) {
            var imageContainer = $("<div>");
            var image = $("<img>");
            var actions = $("<div>");
            var favButton = $("<button>");
            imageContainer.append(image,actions);
            
            //Adding styling classes to imageContainer
            imageContainer.addClass("col-md-4"); //Adding bootstrap responsive classes
            imageContainer.addClass("image-container");

            //Constructing the favourite button
            favButton.text("Add To Favourites");
            favButton.addClass("addFavourite")
            favButton.attr("data-response", JSON.stringify(element));

            //Adding the favourite button to the actions div 
            actions.append(favButton);

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
        array.forEach(function(element) {
            var imageContainer = $("<div>");
            var image = $("<img>");
            var actions = $("<div>");
            var delButton = $("<button>");
            imageContainer.append(image,actions);
            
            //Adding styling classes to imageContainer
            imageContainer.addClass("col-md-4"); //Adding bootstrap responsive classes
            imageContainer.addClass("image-container");

            //Constructing the delete button
            delButton.text("Delete From Favourites");
            delButton.addClass("delFavourite")

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
    newTopic: function(topicName,topicsArray) {
        topicsArray.push(topicName);
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
    }
}




