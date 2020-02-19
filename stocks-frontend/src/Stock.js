import React from 'react'

const Stock = (props) => {
    // pluralizes or singularizes share depending on number of shares
    const determineShare = () => {
        return props.quantity > 1 ? "shares" : "share"
    }

    return (
        <div>
            <h1>{props.ticker} - {props.quantity} {determineShare()} - ${props.current_price}</h1>
        </div>
    )
}

export default Stock