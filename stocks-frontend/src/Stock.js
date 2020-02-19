import React from 'react'

const Stock = (props) => {
    return (
        <div>
            <h1>{props.stock.ticker}</h1>
        </div>
    )
}

export default Stock