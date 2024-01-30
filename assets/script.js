var APIkey = "c26e48ba11f2018a306fa84c728f4266";
var city = $('#search-input');
var searches = JSON.parse(localStorage.getItem('city')) || [];



function getWeather(cityName) {
    console.log(cityName);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    var date = dayjs().format('DD/MM/YYYY');
    console.log(date);
    console.log(queryURL);


    fetch(queryURL)
        .then(function (response) {
            return response.json();   //downloads data from external server
        })
        .then(function (data) {
            saveSearch(data.name);
            $('.weather-display').html("<h1>" + data.name + " (" + date + ") " + "</h1>");
            var icon = $('<img>').attr('src', "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png")
            var tempC = data.main.temp - 273.15;
            var temp = $('<h2>').text("Temp: " + tempC + "C");
            var humidity = $('<h2>').text("Humidity: " + data.main.humidity + "%");
            var wind = $('<h2>').text("Wind: " + data.wind.speed + "KPH");
            $('.weather-display').append(icon, temp, humidity, wind);
        })

}

// local storage for searched cities - save to $('#history')

function saveSearch(cityName) {
    searches.push(cityName); // don't repeat cities
    localStorage.setItem('city', JSON.stringify(searches));
    createButtonSearches();
}

function createButtonSearches() {
    $('#history').empty();
     // function to loop over the searches and create buttons
    for (let i = searches.length - 1; i >= 0; i--) { //use let in for loops
        var button = $('<button>').text(searches[i]);
        button.on('click', function(){
            getWeather(searches[i]);
        })
        $('#history').append(button);
    }
    
}

$('.form').on('submit', function (event) {
    event.preventDefault();
    var cityName = city.val().trim();
    if (!cityName) return;
    getWeather(cityName);
});

createButtonSearches();
// call button function