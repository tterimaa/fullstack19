import React from 'react'

const Numbers = ({persons, deletePerson, filter}) => {
    const filteredPersons = persons.reduce((result, person) => {
        if(new RegExp('^.*' + filter + '.*$', 'i').test(person.name)) {
            result.push(person)
        }
        return result
    }, [])
   
    return filteredPersons.map((p, index) => 
        <div key={index}>
            {p.name} 
            {p.number}
            <button onClick={() => deletePerson(p.id,p.name)}>poista</button>
        </div>
        )
}

export default Numbers