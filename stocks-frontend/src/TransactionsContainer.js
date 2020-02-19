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
            {props.user.stocks.length
            ?
            makeTransactions()
            :
            <h3>You haven't made any transactions yet.</h3>}
        </div>
        
    )
}

export default withAuth(TransactionsContainer)