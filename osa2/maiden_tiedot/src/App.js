import React, { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import CountrySearch from './components/CountrySearch'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    countryService.getAll()
    .then(response => {
      setCountries(response)
    })
    .catch( _ => {
      setCountries([])
    })
  }, [])

  return (
    <>
      <CountrySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
      <Countries countries={countries} filter={searchTerm}/>
    </>
  );
}

export default App;
