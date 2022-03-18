// Global const
const apiKey = "1abc3bd6bfdef6f8c2fe3f7e1751684a";
const cityInput = document.querySelector("input");

// gio location api to get lon and lat for weather api
const searchedLocation = async (city) => {
  const getLocation = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`
  );
  const locatonData = await getLocation.json();
  // retrieve lon and lat from json data array
  const { lat, lon } = locatonData[0];
  // call weather function to send lon and lat to weather api
  weather(lat, lon);
  document.querySelector(".location").innerText = `${city}`;
  // Loading screen upon launch
  document.querySelector(".layout").classList.remove("loading");
};

// weather api
const weather = async (lat, lon) => {
  const getWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`
  );
  const weatherData = await getWeather.json();
  // retrieve elements from api
  let { icon } = weatherData.current.weather[0];
  let { description } = weatherData.current.weather[0];
  let { temp } = weatherData.current;
  temp = Math.round(temp);
  let { max } = weatherData.daily[0].temp;
  max = Math.round(max);
  let { min } = weatherData.daily[0].temp;
  min = Math.round(min);
  // send elements to functon for todays weather
  todayWeatherLayOut(description, temp, max, min, icon);
  // send api data to functon for 7 day forcast
  sevenDayForcast(weatherData);
  // send element to functon that changes background image for each icon
  backgroundImage(icon);
  // send element to functon that changes outside background color depending on day or night
  backgroundColor(icon);
};

// show search bar for city/locations, set to onclick .add-location button
const showSearch = () => {
  const add = document.querySelector(".add");
  if (add.classList.contains("hide")) {
    add.classList.remove("hide");
  } else {
    add.classList.add("hide");
  }
  // clear input after used
  cityInput.value = "";
};
// allow cities in dropdown menu to be selected
const city = document.querySelectorAll("li p");
city.forEach((element) => {
  element.addEventListener("click", () => {
    cityName = element.innerText;
    // send selected city to geo api
    searchedLocation(cityName);
  });
});

// get location from search bar
const getCity = (e) => {
  e.preventDefault();
  var cityValue = cityInput.value;
  // send location to geo api
  searchedLocation(cityValue);
  // remove search bar after selection
  showSearch();
};

// display current weather info on app
const todayWeatherLayOut = (description, temp, max, min, icon) => {
  document.querySelector(".current-temp").innerHTML = `<span>°</span>${temp}`;
  document.querySelector(".todays-high").innerText = `${max}`;
  document.querySelector(".todays-condition").innerText = `${description}`;
  document.querySelector(".todays-low").innerText = `${min}`;
  // retrieve icon image form api
  document.querySelector(
    ".todays-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;
  todaysDate();
};

// get todays date and display on app
const todaysDate = () => {
  let day = new Date().toLocaleDateString("en-us", { weekday: "long" });
  document.querySelector(".current-day").innerText = `${day}`;
  let thisDate = new Date().toLocaleDateString("en-us", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  document.querySelector(".current-date").innerText = `${thisDate}`;
};

// white font and buttons for display used in backgroundImage()
const whiteFontAndBtn = () => {
  document.querySelector("#app").style.color = "white";
  document.querySelectorAll("button").forEach((element) => {
    element.style.color = "white";
  });
  document.querySelector(".bottom").style.color = "white";
};

// dark color font and buttons for display used in backgroundImage()
const darkFontAndBtn = () => {
  document.querySelector("#app").style.color = "#404040";
  document.querySelectorAll("button").forEach((element) => {
    element.style.color = "#404040";
  });
  document.querySelector(".bottom").style.color = "#404040";
};

//assign background image to app based on icon, day and night icons included
const backgroundImage = (icon) => {
  const cardImg = document.querySelector(".card-img");
  if (icon === "01d" || icon === "01n") {
    cardImg.style.backgroundImage = "url(./img/clear-sky.jpeg)";
    document.querySelector("#app").style.color = "#404040";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "#404040";
    });
    document.querySelector(".bottom").style.color = "white";
  } else if (icon === "02d" || icon === "02n") {
    cardImg.style.backgroundImage = "url(./img/few-clouds.jpg)";
    darkFontAndBtn();
  } else if (icon === "03d" || icon === "03n") {
    cardImg.style.backgroundImage = "url(./img/scattered-clouds.jpg)";
    whiteFontAndBtn();
  } else if (icon === "04d" || icon === "04n") {
    cardImg.style.backgroundImage = "url(./img/cloudy.jpg)";
    darkFontAndBtn();
  } else if (icon === "09d" || icon === "09n") {
    cardImg.style.backgroundImage = "url(./img/light-rain.png)";
    whiteFontAndBtn();
  } else if (icon === "10d" || icon === "10n") {
    cardImg.style.backgroundImage = "url(./img/rain.jpg)";
    whiteFontAndBtn();
  } else if (icon === "11d" || icon === "11n") {
    cardImg.style.backgroundImage = "url(./img/thunder-storm.jpg)";
    whiteFontAndBtn();
  } else if (icon === "13d" || icon === "13n") {
    cardImg.style.backgroundImage = "url(./img/snow.jpg)";
    darkFontAndBtn();
  } else if (icon === "50d" || icon === "50n") {
    cardImg.style.backgroundImage = "url(./img/misty.jpg)";
    darkFontAndBtn();
  }
};

// change the background color behind the app for day and night if icon name includes n for night
const backgroundColor = (icon) => {
  if (icon.includes("n")) {
    document.querySelector("#app").style.backgroundColor = "#191970";
  } else {
    document.querySelector("#app").style.backgroundColor = "lightblue";
  }
};

// 7 day forcast elements pulled from data contained in weather api
const sevenDayForcast = (weatherData) => {
  const { daily } = weatherData;
  // loop through api daily array to retrieve elements
  daily.forEach((element, index) => {
    // excludes todays weather from array
    if (index > 0) {
      // days of the week in short form
      let day = new Date(element.dt * 1000).toLocaleDateString("en-us", {
        weekday: "short",
      });
      let { description } = element.weather[0];
      let { icon } = element.weather[0];
      let { max } = element.temp;
      max = Math.round(max);
      let { min } = element.temp;
      min = Math.round(min);
      let column = document.querySelector(".col");
      //create HTML to input data element
      column.innerHTML = `
        <p class="day">${day}</p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="high-temp">°${max}</p>
        <p class="low-temp">°${min}</p>
      `;
      // append HTML to looped rows
      document.querySelector(".day-row").append(column);
    }
  });
};

// first location when app loads
searchedLocation("houston");
