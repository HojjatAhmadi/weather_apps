class weather{
    constructor(namecity , conditions ,temp){
        this.namecity = namecity;
        this.conditions = conditions;
        this.temp = temp;
    }

    SwitchPage(){
        GetNameCitySide.style.display = 'none';
        NameCityText.innerHTML = this.namecity;
        TempText.innerHTML = this.temp;
        ShowTempSide.style.display = 'flex';

        if(this.conditions == 'Clear'){
            CondImages.src = 'Image/icons8-sun-240.png'
        }
        if(this.conditions == 'Cloud'){
            CondImages.src = 'Image/cloud.webp'
        }
        if(this.conditions == 'Rain'){
            CondImages.src = 'Image/rain.png'
        }
        if(this.conditions == 'Snow'){
            CondImages.src = 'Image/snow.png'
        }
    }

}

const GetNameCitySide = document.querySelector('.getnamecity');
const ShowTempSide = document.querySelector('.showweatherOptions')


const NameCity = document.querySelector('.getnamecity input[type="text"]')
const ShowWeather = document.querySelector('.showweathertempbutton')
const NameCityText = document.querySelector('.namecity')
const CondImages = document.querySelector('.conditions')
const TempText = document.querySelector('.temp')
const BackButton = document.querySelector('.backsearchside')
let ApiKey = '8880e1faf1442c8b3f7810229835275a'


async function fetchWeather(api){
    const req = await fetch(api)
    const json = req.json()

    return json

}

function GetGeoLocation(name){
    let locate = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&appid=${ApiKey}`

    fetchWeather(locate).then(data => {
        GetWeatherTemp(data[0].lat , data[0].lon)
    })
}

function GetWeatherTemp(lat , lon){
    let locate = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${ApiKey}`

    fetchWeather(locate).then(date => {
        let templocate = parseInt(date.main.temp / 10);
        let conditions = date.weather[0].main;
        let namelocate = date.name;

        Obj = new weather(namelocate, conditions, templocate)
        Obj.SwitchPage();
    })
}

ShowWeather.addEventListener('click', () => {
    if(NameCity.value.length > 0){
        GetGeoLocation(NameCity.value)
    }
})

BackButton.addEventListener('click', () => {
    GetNameCitySide.style.display = 'flex';
    ShowTempSide.style.display = 'none';
})