import React from 'react'
import Part from './Part'

const Content = (props) => {
    const partsList = t => {
        return t.map(p =>
            <Part name={p.name} exercises={p.exercises} key={p.id} />
        )
    }
    return (
        <React.Fragment>
            {partsList(props.parts)}
        </React.Fragment>
    )
} 

export default Content