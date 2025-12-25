const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.getElementById("cityName");
const loading =document.querySelector("#loading");
const cityInfoBox =document.querySelector("#cityInfo")
const errorBox =document.querySelector("#error")

const lat = document.querySelector("#lat")
const lon = document.querySelector("#lon")
const country =document.querySelector("#country")
const state =document.querySelector("#state")
const population =document.querySelector("#population")


let GEODB_API_KEY = "4d6d85ff85mshd0e2e3f489344e7p104d3cjsn5e39278759b0";
let GEODB_HOST = "wft-geo-db.p.rapidapi.com";

if (city) {
  cityName.textContent = city;

  async function fetchCityDetails(cityName) {
    try {
      let result = await fetch(
        `https://${GEODB_HOST}/v1/geo/cities?namePrefix=${city}&limit=1`,
        {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": GEODB_API_KEY,
            "X-RapidAPI-HOST": GEODB_HOST,
          },
        }
      );
      console.log(result);
      if(!result.ok){
        console.log("API Response Not Found..........");
        
      }
      let data = await result.json();
      console.log(data);
      if(!data.data||data.data.length===0){
        console.log("city not found");
        
      }
      let cityData =data.data[0];
      console.log(cityData);

      lat.textContent =cityData.latitude;
      lon.textContent =cityData.longitude;
      country.textContent=cityData.country;
      state.textContent=cityData.region||"N/A";
      population.textContent=cityData.population?cityData.population.toLocaleString():"N/A"

      loading.classList.add("hidden");
      cityInfoBox.classList.remove("hidden");
      
      
    } catch (error) {
      console.log(error);
         loading.classList.add("hidden");
      errorBox.classList.remove("hidden");
    }
  }
  fetchCityDetails(city);
} else {
  cityName.textContent = "Unknown city";
  loading.classList.add("hidden");
}
 document.querySelector("#weatherBtn").href =`weather.html?city=${city}`;
 document.querySelector("#placeBtn").href =`place.html?city=${city};`
