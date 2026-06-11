// const api = "https://api.weatherapi.com/v1/current.json?key=450ceea80f6246ba800145403252910&q=London&aqi=yes"

const tempField = document.querySelector(".temp");
const cityField = document.querySelector(".city");
const timeField = document.querySelector(".localtime");
const conditionField = document.querySelector(".weather_condition span");
const conditionIcon = document.querySelector(".weather_condition img");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.getElementById("searchInput");

//Updating dom
function updateDOM(data) {
  const { location, current } = data; // object destructuring

  const dateObj = new Date(location.localtime);

  const day = dateObj.toLocaleDateString("en-US", { weekday: "long" });
  const date = dateObj.toLocaleDateString("en-US");
  const time = dateObj.toLocaleTimeString("en-US");

  timeField.textContent = `${day},${date} | ${time}`;

  tempField.textContent = `${current.temp_c}°C`;
  cityField.textContent = location.name;
  
  conditionField.textContent = current.condition.text;
  conditionIcon.src = `https:${current.condition.icon}`;
  conditionIcon.alt = current.condition.text;
}


//Api function calls
async function weatherData(city) {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=450ceea80f6246ba800145403252910&q=${city}&aqi=yes`;
    const response = await fetch(url); // this will result in async code
    
    if (!response.ok) {
        console.error("City not found or invalid response");
      }
      const data = await response.json(); //internally it will do json.parse();
      console.log(data);
      updateDOM(data);
    } catch (error) {
      console.error("Error in fetching data", error.message);
      alert("Unable to fetch weather data");
    }
}
weatherData("pune");

// Adding event listner
searchForm.addEventListener("submit", function (e) {
  e.preventDefault(); //prevents page from realoading
  const city = searchInput.value.trim();
  //it won't submit blank input
  if (city === "") {
    alert("Please enter city name");
    return;
  }
  weatherData(city);
  searchInput.value = "";
});
