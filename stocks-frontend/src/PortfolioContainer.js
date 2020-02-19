import React from 'react'
import withAuth from './withAuth'
import StockContainer from './StockContainer'
import BuyStock from './BuyStock'

const PortfolioContainer = (props) => {
    return (
        <div>
            <StockContainer
                stocks={props.user.stocks}
                refreshStocks={props.refreshStocks}
            />
            <BuyStock
                money={props.user.money}
                buyStockSubmitHandler={props.buyStockSubmitHandler}
            />
        </div>
        
    )
}

export default withAuth(PortfolioContainer)