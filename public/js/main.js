const Submitbtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityname');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');
const temp_real_val = document.getElementById('temp_real_value');
const today_day = document.getElementById('day');
const today_date = document.getElementById('today_date');

const getInfo = async (event) => {
    event.preventDefault();
    let cityval = cityName.value;
    if (cityval === "") {
        datahide.classList.add('data_hide');
        city_name.innerText = `Please write the name before search!`;
    } else {
        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=c8881c51f239b5c4a8da2e4837bc031d`
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            datahide.classList.remove('data_hide');
            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;

            if (tempMood == "Clear") {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
                temp_status.innerHTML =
                    "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>";
            }
            else if (tempMood == "Rain") {
                temp_status.innerHTML =
                    "<i class='fas fa-rain' style='color: #a4b0be;'></i>";
            }
            else {
                temp_status.innerHTML =
                    "<i class='fas fa-sun' style='color: #eccc68;'></i>";
            }
            cityName.value = "";
        } catch {
            city_name.innerText = `Please enter the city name properly!`;
            datahide.classList.add('data_hide');
        }
    }
}
function updateDateTime() {
    const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const curdate = new Date();
    const i = curdate.getDay();
    today_day.innerText = day[i];
    today_date.innerHTML = `${curdate.toLocaleDateString()}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

Submitbtn.addEventListener('click', getInfo);