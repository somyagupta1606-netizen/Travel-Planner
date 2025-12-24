const params =new URLSearchParams(window.location.search);
const city =params.get("city");
const cityName = document.querySelector("#cityName");
const loading = document.querySelector("#loading");
const errorBox = document.querySelector("#error")
let API_KEY ="4cce6f614fe7a885ae47d9270374aecb"

if (!city) {
    loading.classList.add("hidden")
    error.Box.classList.remove("hidden")
    
} else {
    cityName.textContent=city;
    async function fetchWeather(cityName) {
        try {
            let response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}`)
            
        } catch (error) {
            console.log(error,"Error in fetching Weather details");
            loading.classList.add("hidden");
            errorBox.classList.remove("hidden");
            
        }
        
    }
    fetchWeather(city);
}