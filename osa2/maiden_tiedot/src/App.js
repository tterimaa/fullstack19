import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchingCountries from './MatchingCountries'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ foundCountries, setFound ] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log('promise fulfilled');
      setCountries(response.data)
    })
  }, [])

  console.log('render', countries.length, 'countries')
  console.log('found', foundCountries.length, 'countries')
  console.log(foundCountries)
  const handleFind = (event) => {
    setFound(countries.filter(c => c.name.match(new RegExp('.*' + event.target.value + '.*', 'gi'))))
  }

  return (
    <div>
      find countries: <input onChange={handleFind} />
      <MatchingCountries found={foundCountries} setFound={setFound} />
    </div>
  )
}

export default App;
