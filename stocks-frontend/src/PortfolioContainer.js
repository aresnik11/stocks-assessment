import React from 'react'
import withAuth from './withAuth'
import StockContainer from './StockContainer'
import BuyStock from './BuyStock'

const PortfolioContainer = (props) => {
    console.log(props)
    return (
        <div>
            <StockContainer
                stocks={props.user.stocks}
            />
            <BuyStock
                money={props.user.money}
                buyStockSubmitHandler={props.buyStockSubmitHandler}
            />
        </div>
        
    )
}

export default withAuth(PortfolioContainer)