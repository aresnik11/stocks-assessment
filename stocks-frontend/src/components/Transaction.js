import React from 'react'
import * as moment from 'moment'
import { Table } from 'semantic-ui-react'

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
        <Table.Row>
            <Table.Cell>{formatDate()}</Table.Cell>
            <Table.Cell>Buy</Table.Cell>
            <Table.Cell>{props.stock.ticker}</Table.Cell>
            <Table.Cell>{props.stock.quantity} {determineShare()}</Table.Cell>
            <Table.Cell>${parseFloat(props.stock.purchase_price).toFixed(2)}</Table.Cell>
        </Table.Row>
    )
}

export default Transaction