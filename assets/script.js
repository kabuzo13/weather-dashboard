var APIkey = "c26e48ba11f2018a306fa84c728f4266";
// var APIkeyTwo = "f74b449b63b0653d8cb521931484c9a8";
var city = $('#search-input');
var searches = JSON.parse(localStorage.getItem('city')) || [];



function getWeather(cityName) {
    console.log(cityName);
    // var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;
    var date = dayjs().format('DD/MM/YYYY');
    console.log(date);
    // console.log(queryURL);
    console.log(fiveDay);


    fetch(fiveDay)
        .then(function (response) {
            return response.json();  
        })
        .then(function (data) {
            saveSearch(data.city.name);
            // const forecastDays = [];
            // const fiveDayForecast = data.list.filter(function() {
            //     const forecastDate = new Date(data.list[i].dt_txt).getDate();
            //     if(forecastDays.includes(forecastDate)) {
            //         return forecastDays.push(forecastDate);
            //     }
            // })
            // console.log(fiveDayForecast);
            console.log(data);
            console.log(data.city.name);
            for (var i = 0; i < data.length && i <= 6; i++) {
            $('.weather-display').html("<h1>" + data.city.name + " (" + date + ") " + "</h1>");
            var icon = $('<img>').attr('src', "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
            var tempC = data.list[i].main.temp - 273.15;
            var temp = $('<h2>').text("Temp: " + tempC + "C");
            var humidity = $('<h2>').text("Humidity: " + data.list[i].main.humidity + "%");
            var wind = $('<h2>').text("Wind: " + data.list[i].wind.speed + "KPH");
            $('.weather-display').append(icon, temp, humidity, wind);
            }
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
    for (let i = searches.length - 1; i >= 0; i--) { 
        var button = $('<button>').text(searches[i]);
        button.on('click', function(){
            getWeather(searches[i]);
        })
        if (searches.indexOf(searches[i]) === i) {
        $('#history').append(button);
        }
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