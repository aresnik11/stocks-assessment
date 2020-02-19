import React from 'react'
import * as moment from 'moment'

const Transaction = (props) => {
    // pluralizes or singularizes share depending on number of shares
    const determineShare = () => {
        return props.stock.quantity > 1 ? "shares" : "share"
    }

    // formats the date and time of the transacion in M/d hh:mm format
    const formatDate = () => {
        return moment(props.stock.created_at).format("M/D h:mma")
    }

    return (
        <div>
            <h1>{formatDate()} - BUY ({props.stock.ticker}) - {props.stock.quantity} {determineShare()} @ {props.stock.purchase_price}</h1>
        </div>
    )
}

export default Transaction