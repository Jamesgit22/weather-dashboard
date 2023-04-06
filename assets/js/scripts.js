// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");

  // Check if any data is in local storage or assign empty array
  const localStorageArray = JSON.parse(localStorage.getItem("storedArray")) || [];

  // Listener event for the search submit
  $("#search-btn").on("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    // Store search city in an array and save to local storage.
    localStorageArray.unshift($("#search-input").val());
    console.log(localStorageArray);
    localStorage.setItem("storedArray", JSON.stringify(localStorageArray));

    // Dynamically create html elements to store data in info section
    $("#info-section").html(`<div class="col-12 my-3">
        <div class="col-12">
            <div class="col-12 rounded border border-dark p-1">
                <div class="row">
                    <div class="col-2 fs-3 fw-bold">Orlando</div>
                    <div class="col-10 fs-3 fw-bold">(04/05/2023)</div>
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
                            <div class="col-12 fw-bold">4/6/2023</div>
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
                            <div class="col-12 fw-bold">4/6/2023</div>
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
                            <div class="col-12 fw-bold">4/6/2023</div>
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
                            <div class="col-12 fw-bold">4/6/2023</div>
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
                            <div class="col-12 fw-bold">4/6/2023</div>
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



  });
});
