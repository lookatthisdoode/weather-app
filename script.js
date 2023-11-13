import { getWeather } from './util/weather'

const cityInput = document.querySelector('.city-input')
const input = cityInput.querySelector('input')
const button = cityInput.querySelector('button')

const display = document.querySelector('.display')
const displayDegreesConditions = display.querySelector('.degrees-conditions')
const displayCityCountry = document.querySelector('.city')
const displaySunRise = document.querySelector('.sunrise')
const displaySunSet = document.querySelector('.sunset')
const svgSun = document.querySelector('.svg')

async function updateWeather(city) {
  displaySunRise.innerText = ''
  displaySunSet.innerText = ''
  displayCityCountry.innerText = ''
  svgSun.style.display = 'none'

  const weather = await getWeather(city)
  if (weather) {
    //update temperature and conditions
    displayDegreesConditions.innerText = `${weather.temperature}C, ${weather.conditions}`
    //update daytime
    displaySunRise.innerText = weather.sunriseSunset[0]
    displaySunSet.innerText = weather.sunriseSunset[1]
    //update city and country
    displayCityCountry.innerText = `${weather.city}, ${weather.country}`
    svgSun.style.display = 'block'
    input.value = ''
  } else {
    displayDegreesConditions.innerText = 'Oops, city not found'
    return
  }
}

button.addEventListener('click', () => {
  updateWeather(input.value)
  input.innerText = ''
})

window.addEventListener('keydown', (e) => {
  if (e.key != 'Enter') return
  updateWeather(input.value)
  input.innerText = ''
})

updateWeather('brno')
