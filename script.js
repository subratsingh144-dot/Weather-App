
const API_KEY = "XXXXXXXXXX06e68823120be3d4e1a";
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

const SearchBtn = document.querySelector(".ser-btn");
const searchCity = document.querySelector(".search-input");
const weatherIcon = document.querySelector(".weather-logo img");
const err = document.querySelector(".error p");


function printTimeOnly() {
    const options2 = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    };

    return (new Intl.DateTimeFormat('en-GB', options2).format(new Date()));
}

function printDayOnly() {
    const options2 = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'Asia/Kolkata'
    };

    return (new Intl.DateTimeFormat('en-GB', options2).format(new Date()));
}

function formatTime(unix, offset) {
    return new Date((unix + offset) * 1000)
        .toLocaleTimeString('en-IN', {
            timeZone: 'UTC',   // 🔥 KEY FIX
            hour: '2-digit',
            minute: '2-digit',
           
            hour12: true
        });
}

const getWeather = async (City) => {

    try {
        let response = await fetch(`${API_URL}?q=${City}&appid=${API_KEY}&units=metric`);


        if (!response.ok) {
            if (response.status === 400) {
                throw new Error("Bad Request! City name required");
            } else if (response.status === 404) {
                throw new Error("City not found");
            } else {
                throw new Error("Something went wrong");
            }
        }

        let data = await response.json();
        console.log(data);


        const Day = printDayOnly();
        const Time = printTimeOnly();

        document.querySelector("#area b").textContent = data.name + ", " + data.sys.country;
        document.querySelector("#day").textContent = Day;
        document.querySelector("#Today-time").textContent = Time;

        document.querySelector("#temp b").textContent = data.main.temp + "°C";
        document.querySelector("#weather-type ").textContent = data.weather[0].main + ", " + data.weather[0].description;



        const sunrise = formatTime(data.sys.sunrise, data.timezone);
        console.log(sunrise);
        const sunset = formatTime(data.sys.sunset, data.timezone);
        console.log(sunset);


         document.querySelector("#sunrise ").innerHTML = `<b>${sunrise}</b>`;
          document.querySelector("#sunset ").innerHTML = `<b>${sunset}</b>`;






        //weather details
        var Visibility = Number(data.visibility);
        Visibility = Visibility / 1000;
        document.querySelector("#humidity ").textContent = data.main.humidity + "%";
        document.querySelector("#wind ").textContent = data.wind.speed + "km/h";
        document.querySelector("#feels_like ").textContent = data.main.feels_like + "°C";
        document.querySelector("#pressure ").textContent = data.main.pressure + "hPa";
        document.querySelector("#visible ").textContent = Visibility + "km";
        document.querySelector("#wind ").textContent = data.wind.speed + "km/h";



        if (data.weather[0].main == "Haze" || data.weather[0].main == "Smoke") {
            weatherIcon.src = "./weatherPNG/fog.png";

        } else if (data.weather[0].main == " Mist") {
            weatherIcon.src = "./weatherPNG/mist.png";

        } else if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "./weatherPNG/cloudy.png";
        } else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "./weatherPNG/sunny.png";

        } else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "./weatherPNG/storm.png";

        } else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "./weatherPNG/Dizzle.png";

        } else if (data.weather[0].main == "Snow") {
            weatherIcon.src = "./weatherPNG/snowman.png";
        } else {
            weatherIcon.src = "./weatherPNG/mist.png";
        }

        document.querySelector(".container").style.display = "flex";
        document.querySelector(".error").style.display = "none";




    } catch (e) {
        err.textContent = `${e}`;
        document.querySelector(".error").style.display = "block";
        document.querySelector(".container").style.display = "none";

    }
}








SearchBtn.addEventListener("click", () => {

    let City = searchCity.value;
    //weather call

    getWeather(City);




});

















