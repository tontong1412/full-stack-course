import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'

const Filter = ({handleFilter}) => {
  return <div>find countries <input onChange={handleFilter}/></div>
}

const Weather = ({country}) => {
  const iconBaseUrl = 'https://openweathermap.org/img/wn'
  const [weather, setWeather] = useState(null)
  useEffect(() => {
   weatherService.get(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
    .then(response => setWeather(response))
  }, [country])

  if(!weather) return null  
  return <>
    <h2>Weather in {country.capital[0]}</h2>
    <div>temperature {weather?.main.temp } Celcius</div>
    {weather.weather.map(w =><img key={w.id} src={`${iconBaseUrl}/${w.icon}@2x.png`}/>)}
    
    <div>wind {weather?.wind.speed} m/s</div>
  </>
}

const Country = ({country}) => {
  return <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital.join(', ')}</div>
    <div>area {country.area}</div>

    <div><strong>languages:</strong></div>
    <ul>
      {Object.keys(country.languages).map(lang => <li key={lang}>{country.languages[lang]}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.flags.alt}/>

    <Weather country={country} />
  </div>
}

const Countries = ({countries, filter}) => {
  const [selected, setSelected] = useState(null)
  
  useEffect(() => {
    setSelected(null)
  }, [filter])

  const filteredCountries = countries.filter(country=> country?.name.common.toLowerCase().includes(filter))

  if(filteredCountries.length > 10){
    return <div>Too many matches, specify another filter</div>
  } else if(filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return <>
      {filteredCountries.map(country => <div key={country?.name.common}>{country.name.common} <button onClick={()=>setSelected(country)}>show</button></div>)}
      {selected&&<Country country={selected}/>}
    </>
  } else if(filteredCountries.length === 1){
    return <Country country={filteredCountries[0]}/>
  } 
  return null

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    countryService.getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleFilter = (event) => {
    const filterLower = event.target.value.toLowerCase()
    setFilter(filterLower)
  }

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

export default App