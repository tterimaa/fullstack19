import React from 'react'

const Total = ({exercises}) => {
    const sum = t => t.reduce((a,b) => a + b, 0);
    
    return (
    <div>{sum(exercises)}</div>
    )
}

export default Total