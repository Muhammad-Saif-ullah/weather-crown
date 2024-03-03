const weather_dict = {
"CR": "cloudy-rain.png",
"CD": "cloudy.png",
"HR": "heavy-rain.png",
"SF": "snowfall.png",
"ST": "storm.png",
"SU": "sun.png"
}

var mydata;
var text = [
    document.getElementById("temperature"),
    document.getElementById("wind"),
    document.getElementById("humidity")
]

function getWeatherIcon(weather_code) {
    return weather_dict[weather_code];
}

// Sets the text color
for (let i = 0; i < text.length; i++) {
    text[i].style.color = "black";
}

function getWeather(location) {
    if (location == "") {
        alert("Please enter a location");
        return;
    }

    const api_key = "8b75d6cb71a343eeab5123200232910";
    const api_url = "http://api.weatherapi.com/v1/current.json?key=" + api_key + "&q=" + location;

    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        mydata = data;

        if (data.error) {
            alert(data.error.message);
            return;
        }
    
        document.getElementById("temperature").innerHTML = data.current.condition.text + "\n" + data.current.temp_c + "°C";

        if (data.current.temp_c > 30) {
            document.getElementById("container").style.background = "linear-gradient(to right, #ff7f7f, #ffdb8c)";

            for (let i = 0; i < text.length; i++) {
                text[i].style.color = "black";
            }
        }
        else {
            document.getElementById("container").style.background = "linear-gradient(to right, #71ffb5, #87F5FA)";

            for (let i = 0; i < text.length; i++) {
                text[i].style.color = "black";
            }
        }

        if (data.current.is_day == 0) {
            document.body.style.backgroundImage = "url('images/night.jpg')";
            document.body.style.backgroundSize = "cover";
        }
        else {
            document.body.style.backgroundImage = "url('images/day.jpg')";
            document.body.style.backgroundSize = "cover";
        }

        document.getElementById("weather-icon").src = "https:" + data.current.condition.icon;
        document.getElementById("wind").innerHTML = "Wind: " + data.current.wind_kph + " km/h";
        document.getElementById("humidity").innerHTML = "Humidity: " + data.current.humidity + "%";
    })

    // Handle errors
    .catch(err => {
        // Display error.message on alert
        alert(err.message);
        }
    );
}

const searchButton = document.getElementById("search-btn");

searchButton.addEventListener("click", function() {
    const mylocation = document.getElementById("location").value;
    console.clear();
    console.log("The location is: " + mylocation);
    getWeather(mylocation);
});

// Changing the temperature unit
const temperatureDisp = document.getElementById("temperature");
temperatureDisp.addEventListener("click", function() {
    if (mydata == undefined) {
        return;
    }
    else {
        if (temperatureDisp.innerHTML.includes("°C")) {
            temperatureDisp.innerHTML = mydata.current.temp_f + "°F";
        }
        else if (temperatureDisp.innerHTML.includes("°F")) {
            temperatureDisp.innerHTML = mydata.current.temp_c + "°C";
        }
    }
    
});
