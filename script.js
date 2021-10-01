var APIkey = '9a572e1c5efe2d882c1fde53ff255ce0';

var Locations = document.getElementById("location");
var Temperature = document.getElementById("temperature");



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
} else {
    alert("Your browser does not support Geolocation");
}

function showPosition(position) {
    currentLocation(position);
}
function currentLocation(pos) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=${APIkey}`)
    .then(res=> res.json())
    .then(data => {
        console.log(data);

        var temp = data.current.temp;
        
        var celsius = '℃';

        Locations.innerHTML = 'Kuala Lumpur';
        Temperature.innerHTML = temp + celsius;
        
        //adding week weather
    for (i=0;i < 4; i++) {
        var contentBox2 = document.getElementById('content-box-2');

        var date = data.daily[i].dt;
        var newdate = new Date(date*1000);
        var completedate = newdate.toLocaleString("en-US", {weekday:"long"});

        //create element
        var newDiv = document.createElement('div');
        var newDate = document.createElement('h3');
        var newTemp = document.createElement('h1');
        var newIcon = document.createElement('div');

        //css
        newDiv.classList.add('newDiv');
        if (i == 2) {
            newIcon.classList.add('newIcon');
        } else if ( i == 3) {
            newIcon.classList.add('newIcon2');
        } else {
            newIcon.classList.add('newIcon3');
        }
        
        newDate.classList.add('newDate');


        //attribute
        newDate.innerHTML = completedate;
        newTemp.innerHTML = data.daily[i+1].temp.day + celsius;
        

        newDiv.append(newDate);
        newDiv.append(newTemp);
        newDiv.append(newIcon);

        contentBox2.append(newDiv); 
    }
    })


}

function changeVenue(state) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${state}&units=metric&appid=${APIkey}`)
    .then(res=> res.json())
    .then(data=> {
       
        console.log('current city: ',data);
        var celsius = '℃';
        var venue = data.name;
        var temp = data.main.temp;
        var newLat = data.coord.lat;
        var newLon = data.coord.lon;
        

        Locations.innerHTML = venue;
        Temperature.innerHTML = temp + celsius;

        updateData(newLat,newLon);
    })

    var bgImg = document.getElementById('location-background');

    if (state == 'London') {
        bgImg.style.backgroundImage = "url(icons/London.jpg)";
    } else if (state == 'Egypt') 
    {
        bgImg.style.backgroundImage = "url(icons/Egypt.jpg)";
    } else if (state == 'China') 
    {
        bgImg.style.backgroundImage = "url(icons/China.jpg)";
    }
}



function updateData(lat,lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${APIkey}`)
    .then(res=> res.json())
    .then(data => {
        console.log(data);
        var celsius = '℃';
        console.log(document.querySelectorAll('h1'));
        for (i=1; i < 5 ;i++){
            // var testDate = moment().utc(data.daily[i].dt);
            // var newDate = moment(testDate).add(i, 'day').format('MMMM Do');
            // document.querySelectorAll('h1')[i].innerHTML = newDate;
            document.querySelectorAll('h1')[i].innerHTML = data.daily[i].temp.day + celsius;
        }
    }
    )};