import { useState, useEffect } from 'react'
import countryService from './services/countries'

const Filter = ({handleFilter}) => {
  return <div>find countries <input onChange={handleFilter}/></div>
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
  </div>
}

const Countries = ({countries, filter, setSelected}) => {
  const filteredCountries = countries
  .filter(country=> country.name.common.toLowerCase().includes(filter))
  if(filteredCountries.length > 10){
    return <div>Too many matches, specify another filter</div>
  } else if(filteredCountries.length > 1 && filteredCountries.length <= 10) {
    return <>
      {filteredCountries.map(country => <div key={country.name.common}>{country.name.common} <button onClick={()=>setSelected(country)}>show</button></div>)}
    </>
  } else if(filteredCountries.length === 1){
    setSelected(filteredCountries[0])
  } 
  return null

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    countryService.getAll()
      .then(response => {
        setCountries(response)
      })
  }, [])

  const handleFilter = (event) => {
    const filterLower = event.target.value.toLowerCase()
    setFilter(filterLower)
    setSelected(null)
  }

  return (
    <div>
      <Filter handleFilter={handleFilter} />
      <Countries countries={countries} filter={filter} setSelected={setSelected}/>
      {selected && <Country country={selected}/>}
    </div>
  )
}

export default App