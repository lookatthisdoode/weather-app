const API_KEY = '60a2627482d0b703ae54a18cf1a2c43c'

//gets proper time from unix
function fromUnix(unixtime) {
  let date = new Date(unixtime * 1000)
  var hours = date.getHours()

  // Minutes part from the timestamp
  var minutes = '0' + date.getMinutes()

  // Will display time in 10:30:23 format
  var formattedTime = hours + ':' + minutes.substr(-2)

  return formattedTime
}

//get array of weather
export async function getWeather(city) {
  if (!city) return
  const reportRaw = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  )
  const reportData = await reportRaw.json()
  if (reportRaw.ok)
    return {
      city: reportData.name,
      country: reportData.sys.country,
      temperature: Math.round(reportData.main.temp),
      conditions: reportData.weather[0].main,
      feelsLike: Math.round(reportData.main.feels_like),
      sunriseSunset: [
        fromUnix(reportData.sys.sunrise),
        fromUnix(reportData.sys.sunset),
      ],
    }
}
