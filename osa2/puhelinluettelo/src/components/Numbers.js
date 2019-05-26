import React from 'react'

const Numbers = ({persons}) =>
    persons.map((p, index) => 
        <div key={index}>
            {p.name} {p.number}
        </div>
        )

export default Numbers