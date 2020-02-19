import React from 'react'
import Stock from './Stock'

class StockContainer extends React.Component {
    componentDidMount() {
        this.props.refreshStocks()
    }

    // componentDidUpdate() {

    // }

    // aggregates list of stocks to an object where the key is the ticker and the value is another object containing quantity, current_price, and color
    aggregateStocks = () => {
        return this.props.stocks.reduce((obj, stock) => {
            // multiplying the price by quantity as a float and rounding to 2 decimal points
            let aggPrice = stock.current_price * stock.quantity
            let aggPriceDecimal = parseFloat(aggPrice).toFixed(2)
            // if we already have this ticker in our obj, increment the quantity and update the price accordingly
            if (obj.hasOwnProperty(stock.ticker)) {
                obj[stock.ticker]["quantity"] += stock.quantity
                obj[stock.ticker]["current_price"] += parseFloat(aggPriceDecimal)
            }
            // if we don't, add the ticker with the quantity and price
            else {
                obj[stock.ticker] = {
                    quantity: stock.quantity,
                    current_price: parseFloat(aggPriceDecimal),
                    color: stock.color
                }
            }
            return obj
        }, {})
    }

    // reduces all of the stock prices down to one aggregate price of their portfolio
    aggregateValue = (stockObj) => {
        const stockKeys = Object.keys(stockObj)
        const aggValue = stockKeys.reduce((sum, stock) => {
            return sum + stockObj[stock]["current_price"]
        }, 0)
        return aggValue.toFixed(2)
    }

    // creates stock components for each of our aggregated stocks
    makeStocks = (stockObj) => {
        const stockKeys = Object.keys(stockObj)
        return stockKeys.map(stock =>
            <Stock
                key={stock}
                ticker={stock}
                quantity={stockObj[stock]["quantity"]}
                current_price={stockObj[stock]["current_price"]}
                color={stockObj[stock]["color"]}
            />
        )
    }
    render() {
        const stockObj = this.aggregateStocks()
        return (
            <div>
                <h1>Portfolio (${this.aggregateValue(stockObj)})</h1>
                {this.makeStocks(stockObj)}
            </div>
        )
    }
}

export default StockContainer