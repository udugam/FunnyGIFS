
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
            queryUrl: queryUrl,
            method: 'GET'
        }).then(this.renderResults(response)) 
    },
    renderResults: function(response) {
        $(".searchResults").append(response.data[0])
    }

}

//Events
$("#search").on("click", function() {
    var input = $('#user-input').val()
    var query
})


