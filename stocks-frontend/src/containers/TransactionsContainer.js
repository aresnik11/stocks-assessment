import React from 'react'
import withAuth from '../components/withAuth'
import Transaction from '../components/Transaction'
import { Table } from 'semantic-ui-react'

const TransactionsContainer = (props) => {
    const makeTransactions = () => {
        // sorts stocks based on id so that they appear in order, with the most recent transaction listed first
        const sortedStocks = props.user.stocks.sort((a,b) => b.id - a.id)
        return sortedStocks.map(stock => <Transaction key={stock.id} stock={stock} />)
    }

    return (
        <div>
            <h1>Transactions</h1>
            <br/>
            {props.user.stocks.length
            ?
            <>
                <Table color="black" selectable textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Date</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                            <Table.HeaderCell>Stock Ticker</Table.HeaderCell>
                            <Table.HeaderCell>Quantity</Table.HeaderCell>
                            <Table.HeaderCell>Price Per Share</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {makeTransactions()}
                    </Table.Body>
                </Table>
            </>
            :
            <h3>You haven't made any transactions yet.<br/><br/>Make a transaction from the portfolio page.</h3>}
        </div>
        
    )
}

export default withAuth(TransactionsContainer)