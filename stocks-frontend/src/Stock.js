import React from 'react'
import { Table } from 'semantic-ui-react'

const Stock = (props) => {
    // pluralizes or singularizes share depending on number of shares
    const determineShare = () => {
        return props.quantity > 1 ? "shares" : "share"
    }

    const spanStyle = {
        color: props.color
    }

    return (
        <Table.Row>
            <Table.Cell><span style={spanStyle}>{props.ticker}</span></Table.Cell>
            <Table.Cell>{props.quantity} {determineShare()}</Table.Cell>
            <Table.Cell><span style={spanStyle}>${parseFloat(props.current_price).toFixed(2)}</span></Table.Cell>
        </Table.Row>
        // <div>
        //     <h1><span style={spanStyle}>{props.ticker}</span> - {props.quantity} {determineShare()} - <span style={spanStyle}>${parseFloat(props.current_price).toFixed(2)}</span></h1>
        // </div>
    )
}

export default Stock