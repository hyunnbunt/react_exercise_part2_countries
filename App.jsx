
import React from "react"
import {useState, useEffect} from "react"
import axios from "axios"
import './css/weather-icons.min.css'
import './font/weathericons-regular-webfont.svg'

const code_icons = {
  "0" : <i className="wi wi-day-sunny wi-fw" />,
  "1" : <i className="wi wi-day-cloudy" />,
  "2" : <i className="wi wi-day-cloudy" />,
  "3" : <i className="wi wi-day-cloudy" />,
  "45" : <i className="wi wi-day-fog" />,
  "48" : <i className="wi wi-day-fog" />,
  "51" : <i className="wi wi-raindrops" />,
  "53" : <i className="wi wi-raindrops" />,
  "55" : <i className="wi wi-raindrops" />,
  "56" : <i className="wi wi-sprinkle" />,
  "57" : <i className="wi wi-sprinkle" />,
  "61" : <i className="wi wi-rain" />,
  "63" : <i className="wi wi-rain" />,
  "65" : <i className="wi wi-rain" />,
  "66" : <i className="wi wi-rain-wind" />,
  "67" : <i className="wi wi-rain-wind" />,
  "71" : <i className="wi wi-snow" />,
  "73" : <i className="wi wi-snow" />,
  "75" : <i className="wi wi-snow" />,
  "77" : <i className="wi wi-hail" />,
  "80" : <i className="wi wi-shower" />,
  "81" : <i className="wi wi-shower" />,
  "82" : <i className="wi wi-shower" />,
  "85" : <i className="wi wi-snow-wind" />,
  "86" : <i className="wi wi-snow-wind" />,
  "95" : <i className="wi wi-thunderstorm" />,
  "96" : <i className="wi wi-thunderstorm" />,
  "99" : <i className="wi wi-thunderstorm" />,

}


const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [todayTemperature, setTodayTemperature] = useState('loading')
  const [todayWeatherIcon, setTodayWeatherIcon] = useState(<></>)
  const [todayWindSpeed, setTodayWindSpeed] = useState('loading')

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setAllCountries(res.data)
      })
  }, [])

  const handleSearchCountryChange = (event) => {
    setSearchCountry(event.target.value)
    setSelectedCountry(null)
    setTodayTemperature('loading')
    setTodayWeatherIcon(<></>)
  }

  const showLanguages = (targetCountry) => {
    if (targetCountry.hasOwnProperty('languages')) {
      return (
        <div>
          <h2>languages:</h2>
          <ul>
            {Object.values(targetCountry.languages).map(language => 
              <li key={language}>{language}</li>)}
          </ul>
        </div>
      )
    }
  }

  const showName = (targetCountry) => {
    if (targetCountry.hasOwnProperty('name')) {
      return (
        <h1>{targetCountry.name.common}</h1>
      )
    }
  }

  
  const showCapital = (targetCountry) => {
    if (targetCountry.hasOwnProperty('capital')) {
      return (
        <>capital {targetCountry.capital}</>
      )
    }
  }

  const showArea = (targetCountry) => {
    if (targetCountry.hasOwnProperty('area')) {
      return (
        <>area {targetCountry.area}</>
      )
    }
  }

  const showFlag = (targetCountry) => {
    if (targetCountry.hasOwnProperty('flags')) {
      return (
        <img src={targetCountry.flags.png}/>      
      )
    }
  }

  const showWeather = (targetCountry) => {
  
    const lat = targetCountry.latlng[0]
    const lng = targetCountry.latlng[1]

    axios
      .get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`)
      .then(res => {
          setTodayTemperature(res.data.current_weather.temperature + ' Celcius')
          setTodayWeatherIcon(code_icons[res.data.current_weather.weathercode])
          setTodayWindSpeed(res.data.current_weather.windspeed)
          console.log(res.data)
        }
      )

    return (
      <div>
        <h2>Weather in {targetCountry.name.common}</h2>
        <div>
          temperature {todayTemperature}
        </div>
        <div>
          {todayWeatherIcon}
        </div>
        <div>
          wind {todayWindSpeed} m/s
        </div>
      </div>
    )
  }

  const showInfo = (targetCountry) => {
    console.log(targetCountry)
    return (
      <div>
        <div>
          {showName(targetCountry)}
        </div>
        <div>
          {showCapital(targetCountry)}
        </div>
        <div>
          {showArea(targetCountry)}
        </div>
        <div>
          {showLanguages(targetCountry)}
        </div>
        <div>
          {showFlag(targetCountry)}
        </div>
        <div>
          {showWeather(targetCountry)}
        </div>
      </div>
    )
  }

  const tooManyResults = () => {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  const showLists = (filtered) => {
    return (
      <div>
        {filtered.map(country =>
          <div key={country.name.common}>
            <ul>
              {country.name.common} <button onClick={() => setSelectedCountry(country)}>show</button>
            </ul>
          </div>

        )}
      </div>
    )
  }

  const Result = () => {
    const filtered = allCountries.filter(country => 
      country.name.common.toLowerCase()
      .includes(searchCountry.toLowerCase()))

    if (filtered.length > 10) {
      return tooManyResults()
    }

    if (filtered.length === 1) {
      return showInfo(filtered[0])
    }

    else if (selectedCountry === null) {
      return showLists(filtered)
    }

    return showInfo(selectedCountry)
  }

  return (
    <div>
      <form>
        find countries <input onChange={handleSearchCountryChange} />
      </form>
      <Result />
    </div>
  )
}

export default App