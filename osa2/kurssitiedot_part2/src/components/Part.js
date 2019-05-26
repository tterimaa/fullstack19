import React from 'react'

const Part = (props) => {
    return (
        <React.Fragment>
        <div>
        {props.name} {props.exercises}
        </div>        
        </React.Fragment>
    )
}

export default Part