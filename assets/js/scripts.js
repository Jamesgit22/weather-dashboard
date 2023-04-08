// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");

  // might be used to pass to APIs
  let lookUp;
  let hQuery;
  let histBtnLat;
  let histBtnLon;
  let jsonDataDateConv = [];
  let filteredArray = [];

  //   API URLs

  // Check if any data is in local storage or assign empty array
  const localStorageArray =
    JSON.parse(localStorage.getItem("storedArray")) || [];

  // Listener event for the search submit
  $("#search-btn").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    // Store search city in an array and save to local storage.
    localStorageArray.push($("#search-input").val());
    console.log(localStorageArray);
    localStorage.setItem("storedArray", JSON.stringify(localStorageArray));

    // Dynamically create html elements to store data in info section
  });

  // Create new buttons with each search click
  $("#search-btn").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    let newHRow = document.createElement("div");
    let newHbtn = document.createElement("button");
    newHRow.setAttribute("class", "row");
    newHbtn.setAttribute(
      "class",
      "btn col-12 btn-secondary text-light rounded mb-3 text-center history-click"
    );
    newHbtn.textContent = `${$("#search-input").val()}`;
    newHRow.appendChild(newHbtn);
    $("#history-container").append(newHRow);
  });

  //loop that creates the same type of button from local history.
  localStorageArray.forEach((item) => {
    if (localStorageArray != []) {
      const newSHRow = document.createElement("div");
      const newSHbtn = document.createElement("button");
      newSHRow.setAttribute("class", "row");
      newSHbtn.setAttribute(
        "class",
        "btn col-12 btn-secondary text-light rounded mb-3 text-center history-click"
      );
      newSHbtn.textContent = item;
      newSHRow.appendChild(newSHbtn);
      $("#history-container").append(newSHRow);
    }
  });

  // function to get latitude and longitude of city search when historical search is used
  $("#history-container").on("click", ".history-click", function (e) {
    e.stopPropagation();
    hQuery = e.target.textContent;
    logHistGeoJSONData();
    createHistHTML();
  });

  // function to fetch geo API
  async function logHistGeoJSONData() {
    const response = await fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${hQuery}&appid=c664a502c1ab3dc877ac211db4a9428f`
    );
    const jsonData = await response.json();
    histBtnLat = jsonData[0].lat;
    histBtnLon = jsonData[0].lon;
    logHistForeJSONData();
  }

  //   Function to fetch weather data from lat an lon
  async function logHistForeJSONData() {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${histBtnLat}&lon=${histBtnLon}&appid=c664a502c1ab3dc877ac211db4a9428f&units=imperial`
    );
    const jsonData = await response.json();
    const weatherDataUnfilt = [];

    jsonData.list.forEach((data) => {
      const weatherObj = {
        checkDate: dayjs.unix(data.dt).format("D"),
        date: dayjs.unix(data.dt).format("M/D/YYYY"),
        temp: data.main.temp,
        icon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
      };
      weatherDataUnfilt.push(weatherObj);
    });
    console.log(weatherDataUnfilt);
    createHistHTML();
    filterWeatherData(weatherDataUnfilt);
    console.log(filteredArray);
    histDataFill();
    
    
  }

  function filterWeatherData(array) {
    for (let i = 0; i < array.length; i++) {
      if (i === array.length - 1) {
        filteredArray.push(array[i]);
      } else if (array[i].checkDate !== array[i + 1].checkDate) {
        filteredArray.push(array[i]);
      }
    }
    return filteredArray;
  }
// Fill in data from API for a historical button search
  function histDataFill () {
    document.querySelector("#current-day-city").textContent = `${hQuery} ${filteredArray[0].date}`;
    document.querySelector("#icon").textContent = filteredArray[0].icon;
    document.querySelector("#degrees").textContent = filteredArray[0].temp;
    document.querySelector("#wind-speed").textContent = filteredArray[0].windSpeed;
    document.querySelector("#humidity").textContent = filteredArray[0].humidity;
    document.querySelector("#fcast-one-date").textContent = filteredArray[1].date;
    document.querySelector("#icon-f-1").textContent = filteredArray[1].icon;
    document.querySelector("#degrees-f-1").textContent = filteredArray[1].temp;
    document.querySelector("#wind-speed-f-1").textContent = filteredArray[1].windSpeed;
    document.querySelector("#humidity-f-1").textContent = filteredArray[1].humidity;
    document.querySelector("#fcast-two-date").textContent = filteredArray[2].date;
    document.querySelector("#icon-f-2").textContent = filteredArray[2].icon;
    document.querySelector("#degrees-f-2").textContent = filteredArray[2].temp;
    document.querySelector("#wind-speed-f-2").textContent = filteredArray[2].windSpeed;
    document.querySelector("#humidity-f-2").textContent = filteredArray[2].humidity;
    document.querySelector("#fcast-three-date").textContent = filteredArray[3].date;
    document.querySelector("#icon-f-3").textContent = filteredArray[3].icon;
    document.querySelector("#degrees-f-3").textContent = filteredArray[3].temp;
    document.querySelector("#wind-speed-f-3").textContent = filteredArray[3].windSpeed;
    document.querySelector("#humidity-f-3").textContent = filteredArray[3].humidity;
    document.querySelector("#fcast-four-date").textContent = filteredArray[4].date;
    document.querySelector("#icon-f-4").textContent = filteredArray[4].icon;
    document.querySelector("#degrees-f-4").textContent = filteredArray[4].temp;
    document.querySelector("#wind-speed-f-4").textContent = filteredArray[4].windSpeed;
    document.querySelector("#humidity-f-4").textContent = filteredArray[4].humidity;
    document.querySelector("#fcast-five-date").textContent = filteredArray[5].date;
    document.querySelector("#icon-f-5").textContent = filteredArray[5].icon;
    document.querySelector("#degrees-f-5").textContent = filteredArray[5].temp;
    document.querySelector("#wind-speed-f-5").textContent = filteredArray[5].windSpeed;
    document.querySelector("#humidity-f-5").textContent = filteredArray[5].humidity;
    filteredArray = [];
  }

  function createHistHTML() {
    $("#info-section").html(`<div class="col-12 my-3">
    <div class="col-12">
        <div class="col-12 rounded border border-dark p-1">
            <div class="row">
                <div class="col-12 fs-3 fw-bold">
                  <h1 id="current-day-city"></h1>
                </div>  
            </div>
            <div class="row">
                        <div class="col-12 py-1"><span id="icon"></span></div>
                    </div>
            <div class="row">
                <div class="col-12 py-3">Temp: <span id="degrees"></span> ^F</div>
            </div>
            <div class="row">
                <div class="col-12 py-3">Wind: <span id="wind-speed"></span> MPH</div>
            </div>
            <div class="row">
                <div class="col-12 py-3">Humidity: <span id="humidity"></span>%</div>
            </div>
        </div>
    </div>
<!-- 5 day forecast section -->
    <div class="row">
        <div class="col-12 py-2 fw-bold">5-Day Forecast:</div>
    </div>
    <div class="row">
        <div class="col-12 ps-4">
            <div class="row justify-content-between">
                <div class="col-2 p-1 bg-cust-forecast text-light">
                    <div class="row">
                        <div id="fcast-one-date" class="col-12 fw-bold">4/6/2023</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1"><span id="icon-f-1"></span></div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Temp: <span id="degrees-f-1"></span> ^F</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Wind: <span id="wind-speed-f-1"></span> MPH</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Humidity: <span id="humidity-f-1"></span>%</div>
                    </div>
                </div>
                <div class="col-2 p-1 bg-cust-forecast text-light">
                    <div class="row">
                        <div id="fcast-two-date" class="col-12 fw-bold">4/6/2023</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1"><span id="icon-f-2"></span></div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Temp: <span id="degrees-f-2"></span> ^F</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Wind: <span id="wind-speed-f-2"></span> MPH</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Humidity: <span id="humidity-f-2"></span>%</div>
                    </div>
                </div>
                <div class="col-2 p-1 bg-cust-forecast text-light">
                    <div class="row">
                        <div id="fcast-three-date" class="col-12 fw-bold">4/6/2023</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1"><span id="icon-f-3"></span></div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Temp: <span id="degrees-f-3"></span> ^F</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Wind: <span id="wind-speed-f-3"></span> MPH</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Humidity: <span id="humidity-f-3"></span>%</div>
                    </div>
                </div>
                <div class="col-2 p-1 bg-cust-forecast text-light">
                    <div class="row">
                        <div id="fcast-four-date" class="col-12 fw-bold">4/6/2023</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1"><span id="icon-f-4"></span></div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Temp: <span id="degrees-f-4"></span> ^F</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Wind: <span id="wind-speed-f-4"></span> MPH</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Humidity: <span id="humidity-f-4"></span>%</div>
                    </div>
                </div>
                <div class="col-2 p-1 bg-cust-forecast text-light">
                    <div class="row">
                        <div id="fcast-five-date" class="col-12 fw-bold">4/6/2023</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1"><span id="icon-f-5"></span></div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Temp: <span id="degrees-f-5"></span> ^F</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Wind: <span id="wind-speed-f-5"></span> MPH</div>
                    </div>
                    <div class="row">
                        <div class="col-12 py-1">Humidity: <span id="humidity-f-5"></span>%</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>`);
  }
});
