import React from 'react'
import withAuth from './withAuth'
import Transaction from './Transaction'

const TransactionsContainer = (props) => {
    const makeTransactions = () => {
        return props.user.stocks.map(stock => <Transaction key={stock.id} stock={stock} />)
    }

    return (
        <div>
            <h1>Transactions</h1>
            {makeTransactions()}
        </div>
        
    )
}

export default withAuth(TransactionsContainer)