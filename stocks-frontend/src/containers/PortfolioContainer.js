import React from 'react'
import withAuth from '../components/withAuth'
import StockContainer from './StockContainer'
import BuyStock from '../components/BuyStock'
import { Grid } from 'semantic-ui-react'

const PortfolioContainer = (props) => {
    return (
        <Grid>
            <Grid.Row>
                <Grid.Column width={9}>
                    <StockContainer
                        stocks={props.user.stocks}
                        refreshStocks={props.refreshStocks}
                    />
                </Grid.Column>
                <Grid.Column width={7}>
                    <BuyStock
                        money={props.user.money}
                        buyStockSubmitHandler={props.buyStockSubmitHandler}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}

export default withAuth(PortfolioContainer)