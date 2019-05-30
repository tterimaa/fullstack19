import React from 'react'

const MatchingCountries = ({found, setFound}) => {
    
    if(found.length === 0) return <div>No results</div>
    if(found.length > 10) {
        return <div>Too man matches, specify another filter</div>
    }
    if(found.length === 1) {
        const country = found[0];
        return (
            <div>
                <h1>
                    {country.name}
                </h1>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
                <h2>languages</h2>
                <ul>
                    {country.languages.map((l,index) => <li key={index}>{l.name}</li>)}
                </ul>
                <img src={country.flag} alt="lippu" />
            </div>
        )
    }

    return (
        <div>
            {found.map((c,index) => 
            <div key={index}>
            {c.name}
            <button onClick={() => setFound([c])}>show</button>
            </div>
            )}
        </div>
    )
}

export default MatchingCountries