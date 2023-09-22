
import React from "react"
import {useState, useEffect} from "react"
import axios from "axios"

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(res => {
        setAllCountries(res.data)
      })
  }, [])

  const handleSearchCountryChange = (event) => {
    setSearchCountry(event.target.value)
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

  const Result = () => {
    const filtered = allCountries.filter(country => 
      country.name.common.toLowerCase()
      .includes(searchCountry.toLowerCase()))

    if (filtered.length > 10) {
      return (
        <div>
          Too many matches, specify another filter
        </div>
      )
    }

    if (filtered.length === 1) {
      const targetCountry = filtered[0]
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
        </div>
        
      )
    }

    return (
      <div>
        {filtered.map(country =>
          <ul key={country.name.common}>{country.name.common}</ul>
        )}
      </div>
    )
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