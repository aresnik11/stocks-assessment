import React from 'react'
import Stock from './Stock'

const StockContainer = (props) => {
    const makeStocks = () => {
        return props.stocks.map(stock => <Stock key={stock.id} stock={stock} />)
    }

    return (
        <div>
            <h1>Portfolio</h1>
            {makeStocks()}
        </div>
    )
}

export default StockContainer