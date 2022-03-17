const apiKey = "1abc3bd6bfdef6f8c2fe3f7e1751684a";
const cityInput = document.querySelector("input");
const searchBtn = document.querySelector(".fa-search");

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
  document.querySelector(".layout").classList.remove("loading");
};

// weather api
const weather = async (lat, lon) => {
  const getWeather = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=hourly,minutely&appid=${apiKey}`
  );
  const weatherData = await getWeather.json();
  let { icon } = weatherData.current.weather[0];
  let { description } = weatherData.current.weather[0];
  let { temp } = weatherData.current;
  temp = Math.round(temp);
  let { max } = weatherData.daily[0].temp;
  max = Math.round(max);
  let { min } = weatherData.daily[0].temp;
  min = Math.round(min);
  todayWeatherLayOut(description, temp, max, min, icon);
  sevenDayForcast(weatherData);
  backgroundImage(icon);
  backgroundColor(icon);
};

const showSearch = () => {
  const add = document.querySelector(".add");
  if (add.classList.contains("hide")) {
    add.classList.remove("hide");
  } else {
    add.classList.add("hide");
  }
  cityInput.value = "";
};

const city = document.querySelectorAll("li p");
city.forEach((element) => {
  element.addEventListener("click", () => {
    cityName = element.innerText;
    searchedLocation(cityName);
  });
});

const getCity = (e) => {
  e.preventDefault();
  var cityValue = cityInput.value;
  searchedLocation(cityValue);
  showSearch();
};

const todayWeatherLayOut = (description, temp, max, min, icon) => {
  document.querySelector(".current-temp").innerHTML = `<span>°</span>${temp}`;
  document.querySelector(".todays-high").innerText = `${max}`;
  document.querySelector(".todays-condition").innerText = `${description}`;
  document.querySelector(".todays-low").innerText = `${min}`;
  document.querySelector(
    ".todays-icon"
  ).innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">`;
  todaysDate();
};

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

const backgroundImage = (icon) => {
  const cardImg = document.querySelector(".card-img");
  if (icon === "01d" || icon === "01n") {
    cardImg.style.backgroundImage = "url(./img/clear-sky.jpeg)";
    document.querySelector(".bottom").style.color = "white";
  } else if (icon === "02d" || icon === "02n") {
    cardImg.style.backgroundImage = "url(./img/few-clouds.jpg)";
    document.querySelector(".bottom").style.color = "#404040";
  } else if (icon === "03d" || icon === "03n") {
    cardImg.style.backgroundImage = "url(./img/scattered-clouds.jpg)";
    document.querySelector("#app").style.color = "white";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "white";
    });
    document.querySelector(".bottom").style.color = "white";
  } else if (icon === "04d" || icon === "04n") {
    cardImg.style.backgroundImage = "url(./img/cloudy.jpg)";
    document.querySelector("#app").style.color = "#404040";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "#404040";
    });
    document.querySelector(".bottom").style.color = "#404040";
  } else if (icon === "09d" || icon === "09n") {
    cardImg.style.backgroundImage = "url(./img/light-rain.png)";
    document.querySelector("#app").style.color = "white";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "white";
    });
    document.querySelector(".bottom").style.color = "white";
  } else if (icon === "10d" || icon === "10n") {
    cardImg.style.backgroundImage = "url(./img/rain.jpg)";
    document.querySelector("#app").style.color = "white";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "white";
    });
    document.querySelector(".bottom").style.color = "white";
  } else if (icon === "11d" || icon === "11n") {
    cardImg.style.backgroundImage = "url(./img/thunder-storm.jpg)";
    document.querySelector("#app").style.color = "white";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "white";
    });
    document.querySelector(".bottom").style.color = "white";
  } else if (icon === "13d" || icon === "13n") {
    cardImg.style.backgroundImage = "url(./img/snow.jpg)";
    document.querySelector("#app").style.color = "#404040";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "#404040";
    });
    document.querySelector(".bottom").style.color = "#404040";
  } else if (icon === "50d" || icon === "50n") {
    cardImg.style.backgroundImage = "url(./img/misty.jpg)";
    document.querySelector("#app").style.color = "#404040";
    document.querySelectorAll("button").forEach((element) => {
      element.style.color = "#404040";
    });
    document.querySelector(".bottom").style.color = "#404040";
  }
};

const backgroundColor = (icon) => {
  if (icon.includes("n")) {
    document.querySelector("#app").style.backgroundColor = "#191970";
  } else {
    document.querySelector("#app").style.backgroundColor = "lightblue";
  }
};

const sevenDayForcast = (weatherData) => {
  const { daily } = weatherData;
  daily.forEach((element, index) => {
    const dayRow = document.querySelector(".day-row");
    if (index > 0) {
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
      column.innerHTML = `
        <p class="day">${day}</p>
        <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="${description}">
        <p class="high-temp">°${max}</p>
        <p class="low-temp">°${min}</p>
      `;
      dayRow.append(column);
    }
  });
};

searchedLocation("houston");
