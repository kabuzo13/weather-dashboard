var APIkey = "c26e48ba11f2018a306fa84c728f4266";
var city = $('#search-input');
var cityName = city.val().trim();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;

function cityInput() {
    var cityName = city.val().trim();
    if (!cityName) return;
    console.log(queryURL);

    fetch(queryURL)
    .then(function (response){

    return response.json();
})

cityInput()

}

fetch(queryURL)
.then(function (response){

    return response.json();
})

.then(function (data) {
    
    console.log(data)
})

// local storage for searched cities - save to $('#history')
// 