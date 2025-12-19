const params = new URLSearchParams(window.location.search);

const city = params.get("city");

const cityName = document.getElementById("cityName");

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
      
    } catch (error) {
      console.log(error);
    }
  }
  fetchCityDetails(city);
} else {
  cityName.textContent = "Unknown city";
}
