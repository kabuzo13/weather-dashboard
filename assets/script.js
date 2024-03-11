var APIkey = "c26e48ba11f2018a306fa84c728f4266";
var city = $('#search-input');
var searches = JSON.parse(localStorage.getItem('city')) || [];


function getWeather(cityName) {
    console.log(cityName);
    var fiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIkey;
    var date = dayjs().format('DD/MM/YYYY');
    console.log(date);
    console.log(fiveDay);


    fetch(fiveDay)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            saveSearch(data.city.name);
            console.log(data);
            var icon = $('<img>').attr('src', "https://openweathermap.org/img/wn/" + data.list[0].weather[0].icon + ".png");
            var description = data.list[0].weather[0].description;
            var tempC = data.list[0].main.temp - 273.15;
            var temp = $('<h2>').text("Temp: " + Math.round(tempC) + "C");
            var humidity = $('<h2>').text("Humidity: " + data.list[0].main.humidity + "%");
            var wind = $('<h2>').text("Wind: " + data.list[0].wind.speed + "KPH");
            var todayCard = $('<div>').addClass("card col").append("<h1>" + data.city.name + " (" + date + ") " + "</h1>",icon, description, temp, humidity, wind)
            $('#today').empty().append(todayCard);

            $('#forecast').empty();

            for (var i = 7; i < data.list.length; i += 8) {
                var forecastDate = new Date(data.list[i].dt_txt).toLocaleDateString();
                var icon = $('<img>').attr('src', "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png").addClass("icon");
                var description = data.list[i].weather[0].description;
                var tempC = data.list[i].main.temp - 273.15;
                var temp = $('<h2>').text("Temp: " + Math.round(tempC) + "C");
                var humidity = $('<h2>').text("Humidity: " + data.list[i].main.humidity + "%");
                var wind = $('<h2>').text("Wind: " + data.list[i].wind.speed + "KPH");
                var card = $('<div>').addClass("card col").append(forecastDate, icon, description, temp, humidity, wind);
                $('#forecast').append(card);
            }
        })

}

function saveSearch(cityName) {
    searches.push(cityName);
    localStorage.setItem('city', JSON.stringify(searches));
    createButtonSearches();
}

function createButtonSearches() {
    $('#history').empty();
    for (let i = searches.length - 1; i >= 0; i--) {
        var button = $('<button>').text(searches[i]);
        button.on('click', function () {
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
    getForecast();
});

createButtonSearches();