
var gifs = {
    topics: ["weekend", "office", "coding"],
    favourties: [],
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
    renderResults: function(response,divName) {
        var responseArray = response.data
        responseArray.forEach(function(element) {
            var imageContainer = $("<div>");
            var image = $("<img>");
            imageContainer.append(image);
            
            //Adding styling classes to imageContainer
            imageContainer.addClass("col-md-4"); //Adding bootstrap responsive classes

            //Adding atrributes and styling classes to image
            image.addClass("img-fluid"); //Adds Bootstrap specific class for styling
            image.addClass("gif");
            image.attr("data-still", element.images.fixed_height_still.url)
            image.attr("src", element.images.fixed_height_still.url)
            image.attr("data-animate", element.images.fixed_height.url)
            image.attr("data-state", "still")
            $(divName).append(imageContainer)
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
    }
}




