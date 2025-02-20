document.getElementById("header").innerText = "Weather Alert App";
document.getElementById("greetingResult").innerText = "Welcome to the most accurate weather app!";

let navigationService = {
  navItems: document.getElementsByClassName("nav-item"),
  pages: document.getElementsByClassName("page"),
  citySearchBtn: document.getElementById("citySearchBtn"),
  citySearchInput: document.getElementById("citySearchInput"),
  activateItem: function (item) {
    for (let navItem of this.navItems) {
      navItem.classList.remove("active");
    }
    item.classList.add("active");
  },
  displayPage: function (index) {
    for (let page of this.pages) {
      page.style.display = "none";
    }
    this.pages[index].style.display = "block";
  },
  registerEventListeners: function () {
    for (let i = 0; i < this.navItems.length; i++) {
      this.navItems[i].addEventListener("click", function () {
        navigationService.activateItem(this);
        navigationService.displayPage(i);
      });
    }

    this.citySearchBtn.addEventListener("click", function () {
      console.log(`Search input: ${navigationService.citySearchInput.value}`);
      if (navigationService.citySearchInput.value) {
        weatherApiService.getWeatherData(navigationService.citySearchInput.value);
      }
    });
  },
};
navigationService.registerEventListeners();

let weatherApiService = {
  apiKey: "1b18251131abfb7108fffc1ba180b116",
  getWeatherData: async function (city) {
    try {
      document.getElementById("loadingSpinner").style.display = "block";
      document.getElementById("errorMessage").style.display = "none";

      let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&APPID=${this.apiKey}`;
      let response = await fetch(url);
      let data = await response.json();
      console.log(data)
      let statisticsData = statisticsService.calculateStatistics(data);
      uiService.displayStatistics(statisticsData);

      hourlyData = data.list; 
      uiService.displayHourlyTable(hourlyData);
    } catch (error) {
      console.log("An error occurred:", error);
      document.getElementById("errorMessage").innerText = `Error: no page like that`;
      document.getElementById("errorMessage").style.display = "block";
    } finally {
      document.getElementById("loadingSpinner").style.display = "none";
    }
  },
};

let statisticsService = {
  calculateStatistics: function (data) {
    let initialValues = {
      tempSum: 0,
      humiditySum: 0,
      minTemp: data.list[0].main.temp,
      maxTemp: data.list[0].main.temp,
      minHumidiy: data.list[0].main.humidity,
      maxHumidiy: data.list[0].main.humidity,
    };

    let res = data.list.reduce(function (result, item) {
      result.tempSum += item.main.temp;
      result.humiditySum += item.main.humidity;

      if (item.main.temp < result.minTemp) {
        result.minTemp = item.main.temp;
      }

      if (item.main.temp > result.maxTemp) {
        result.maxTemp = item.main.temp;
      }

      if (item.main.humidity < result.minHumidiy) {
        result.minHumidiy = item.main.humidity;
      }

      if (item.main.humidity > result.maxHumidiy) {
        result.maxHumidiy = item.main.humidity;
      }

      return result;
    }, initialValues);

    let statisticsResult = {
      averageTemperature: initialValues.tempSum / data.list.length,
      averageHumidity: initialValues.humiditySum / data.list.length,
      minTemperature: initialValues.minTemp,
      maxTemperature: initialValues.maxTemp,
      minHumidity: initialValues.minHumidiy,
      maxHumidiy: initialValues.maxHumidiy,
    };

    return statisticsResult;
  },
};

let aboutInfo = {
  creator: "G6",
  academy: "Qinshift Academy",
  year: 2025,
};

let uiService = {
  showAboutInfo: function () {
    document.getElementById("aboutResult").innerHTML = `<h2>This app is created by ${aboutInfo.creator} from the ${aboutInfo.academy}</h2>
      <p><b>${aboutInfo.year}</b></p>`;
  },
  displayStatistics: function (statisticsData) {
    document.getElementById("statisticsResult").innerHTML = `
      <div class="container">
        <div class="row">
          <div class="col-6">AVG TEMP: ${statisticsData.averageTemperature} C</div>
          <div class="col-6">AVG HUMIDITY: ${statisticsData.averageHumidity} %</div>
        </div>
        <div class="row">
          <div class="col-6">MIN TEMP: ${statisticsData.minTemperature} C</div>
          <div class="col-6">MIN HUMIDITY: ${statisticsData.minHumidity} %</div>
        </div>
        <div class="row">
          <div class="col-6">MAX TEMP: ${statisticsData.maxTemperature} C</div>
          <div class="col-6">MAX HUMIDITY: ${statisticsData.maxHumidiy} %</div>
        </div>
      </div>`;
  },
  displayHourlyTable: function (hourlyData) {
    let hourlyTableHTML = `
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Icon</th>
            <th>Description</th>
            <th>Date/Time</th>
            <th>Temperature (℃)</th>
            <th>Humidity (%)</th>
            <th>Wind Speed (m/s)</th>
          </tr>
        </thead>
        <tbody>`;

    hourlyData.forEach((item) => {
        hourlyTableHTML += `
        <tr>
          <td><img src="http://openweathermap.org/img/w/${item.weather[0].icon}.png" alt="${item.weather[0].description}"></td>
          <td>${item.weather[0].description}</td>
          <td>${new Date(item.dt_txt).toLocaleString()}</td>
          <td>${item.main.temp}</td>
          <td>${item.main.humidity}</td>
          <td>${item.wind.speed}</td>
        </tr>`;
    });

    hourlyTableHTML += `</tbody></table>`;
    document.getElementById("hourlyTableResult").innerHTML = hourlyTableHTML;
  },
};


let hourlyData = []; 

document.getElementById("sortTempAsc").addEventListener("click", () => {
  hourlyData.sort((a, b) => a.main.temp - b.main.temp);
  uiService.displayHourlyTable(hourlyData);
});

document.getElementById("sortTempDesc").addEventListener("click", () => {
  hourlyData.sort((a, b) => b.main.temp - a.main.temp);
  uiService.displayHourlyTable(hourlyData);
});

document.getElementById("sortHumidityAsc").addEventListener("click", () => {
  hourlyData.sort((a, b) => a.main.humidity - b.main.humidity);
  uiService.displayHourlyTable(hourlyData);
});

document.getElementById("sortHumidityDesc").addEventListener("click", () => {
  hourlyData.sort((a, b) => b.main.humidity - a.main.humidity);
  uiService.displayHourlyTable(hourlyData);
});

uiService.showAboutInfo();
weatherApiService.getWeatherData("Skopje");
console.log("Test");