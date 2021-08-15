/**
 * enter location
 * get weather
 * have some icons
 */
 const apikey = "3265874a2c77ae4a04bb96236a642d2f";

 
 function getWeatherOfLocation(){
     const location = document.getElementById('locationInput').value;
     if(location === ''){
      document.getElementById('degree').innerHTML = '';
      return;
     }
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`,{
        origin: "cors" 
     })
  .then(response => response.json())
  .then(data => displayData(data));
    }
    function displayData(apiData){
      const temp = KtoC(apiData.main.temp);
      const icon = apiData.weather[0].icon;
      const desc = apiData.weather[0].main;
      document.getElementById('degree').innerHTML =
       `<div class="weatherData">
       <img src="https://openweathermap.org/img/wn/${icon}@2x.png" />
       <span>${temp}&deg;C</span> 
       <img src="https://openweathermap.org/img/wn/${icon}@2x.png" /> 
       </div>
       <span class="desc">${desc}</span>
      `;
    }
    function KtoC(temp){
        return Math.floor(temp - 273.15);
    }
    window.onload = function() {

    //apply logic with Enter press
     document.getElementById('locationInput').addEventListener('keyup',function(event){
           if (event.keyCode === 13) {
             getWeatherOfLocation();
           }
       });
   
   };