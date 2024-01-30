var APIkey = "c26e48ba11f2018a306fa84c728f4266";
var city = $('#search-input');

function getWeather(cityName) {
    var cityName = city.val().trim();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIkey;
    var date = dayjs().format('DD/MM/YYYY');
    console.log(date);
    console.log(queryURL);
    if (!cityName) return;


    fetch(queryURL)
    .then(function (response){
    
    $('.weather-display').html("<h1>" + data.name + " (" + date + ") " + "</h1>");
    $('<h2>').text("Temp: " + data.temp + "C");
    $('<h2>').text("Humidity: " + data.humidity + "%");
    $('<h2>').text("Wind: " + data.wind + "KPH");
    $('.weather-display').append('h2');


    return response.json();


})

}

// local storage for searched cities - save to $('#history')

function saveSearch() {

}

$('button').on('click', getWeather())