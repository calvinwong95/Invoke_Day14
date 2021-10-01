console.log("File Working");

var APIkey = '9a572e1c5efe2d882c1fde53ff255ce0'
;

var Location = document.getElementById('location');
var Humidity = document.getElementById('humidity');
var Pressure = document.getElementById('pressure');
var Lat = document.getElementById('lat');
var Lon = document.getElementById('lon');

// to get current location - start //
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert ("Your browser does not support Geolocation");
}   

function showPosition(position) {
    console.log('My position is:', position);
    callWeatherApi(position);
}
// to get current location - end//

function callWeatherApi (pos) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&appid=${APIkey}`).then(res => res.json()) //promise or method
    .then(data => {
    console.log(data);
    var timezone = data.timezone;
    var humidity = data.current.humidity;
    var pressure = data.current.pressure;
    var lat = data.lat;
    var lon = data.lon;

   

    console.log(`Timezone: ${timezone}, Humidity: ${humidity}`);

    Location.innerHTML = timezone;
    Humidity.innerHTML = humidity;
    Pressure.innerHTML = pressure;
    Lat.innerHTML = lat;
    Lon.innerHTML = lon;
    });
}

function currentApi(state) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${APIkey}`)
    .then(res => res.json())
    .then(data => {
        console.log('current city: ',data)

        var timezone = data.name;
        var humidity = data.main.humidity;
        var pressure = data.main.pressure;
        var lat = data.coord.lat;
        var lon = data.coord.lon;
        var dateTime = moment.utc(data.dt).format('MMMM Do YYYY, h:mm:ss a');

        console.log(dateTime);
   

        console.log(`Timezone: ${timezone}, Humidity: ${humidity}`);

        Location.innerHTML = timezone;
        Humidity.innerHTML = humidity;
        Pressure.innerHTML = pressure;
        Lat.innerHTML = lat;
        Lon.innerHTML = lon;
    })
}

