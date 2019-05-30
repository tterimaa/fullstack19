import React from 'react'

const Numbers = ({persons, deletePerson}) => {
    console.log(persons)
    return persons.map((p, index) => 
        <div key={index}>
            {p.name} 
            {p.number}
            <button onClick={() => deletePerson(p.id,p.name)}>poista</button>
        </div>
        )
}

export default Numbers