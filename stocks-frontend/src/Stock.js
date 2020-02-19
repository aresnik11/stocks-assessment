import React from 'react'

const Stock = (props) => {
    // pluralizes or singularizes share depending on number of shares
    const determineShare = () => {
        return props.quantity > 1 ? "shares" : "share"
    }

    const spanStyle = {
        color: props.color
    }

    return (
        <div>
            <h1><span style={spanStyle}>{props.ticker}</span> - {props.quantity} {determineShare()} - <span style={spanStyle}>${props.current_price}</span></h1>
        </div>
    )
}

export default Stock