import React, { useState } from 'react'
import weatherService from '../services/weather'

const Weather = ({weather}) => {
    return (
      <div>
        <p>temperature: {(weather.main.temp - 273.15).toFixed(2)} Celsius</p>
        <img style={{backgroundColor: 'darkgray'}} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width='100' heigth='100' />
        <p>wind: {weather.wind.speed} m/s</p>
      </div>
    )
  }

const Country = ({country}) => {
    const [showDetails, setShowDetails] = useState(false)
    const [weather, setWeather] = useState(null)
  
    const handleShowDetails = () => {
      setShowDetails(!showDetails)
      if (!showDetails) {
        weatherService.get(country.capitalInfo.latlng)
        .then(weather => {
          setWeather(weather)
        })
      }
      else {
        setWeather(null)
      }
    }
  
    if (showDetails) {
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>capital: {country.capital}</p>
          <p>population: {country.population}</p>
          <p>area: {`${country.area} km²`}</p>
          <h3>languages</h3>
          <ul>
            {Object.entries(country.languages).map(language => <li key={language[0]}>{language[1]}</li>)}
          </ul>
          <img src={country.flags.png} alt={country.flags.alt} width='150' heigth='150' />
          <h3>Weather in {country.capital}</h3>
          {weather !== null ? <Weather weather={weather}/> : <p>loading weather...</p>}
          <br/>
          <button onClick={handleShowDetails}>hide</button>
        </div>
      )
    } else {
      return (
        <div>
          {country.name.common}
          <button onClick={handleShowDetails}>show</button>
        </div>
      )
    }
  }

const Countries = ({countries, filter}) => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.trim().toLowerCase()))

    if (filteredCountries.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    } else if (filteredCountries.length > 1) {
      return (
        <div>
          {filteredCountries.map(country => <Country country={country} key={country.name.common}/>)}
        </div>
      )
    } else if (filteredCountries.length === 1) {
      return (
        <div>
          <Country country={filteredCountries[0]}/>
        </div>
      )
    } else {
      return (
        <div>
          No countries found
        </div>
      )
    }
  }

  export default Countries