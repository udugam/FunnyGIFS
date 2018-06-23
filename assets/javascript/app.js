
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
            utilities.renderResults(response)
        }) 
    },
    renderResults: function(response) {
        console.log(response);
        //store response.data in an array then iterate through the array
        $(".searchResults").append(response.data[0].type)
    }

}

//Events
$("#search").on("click", function() {
    var input = $("#user-input").val();
    utilities.search(input,1);
})


