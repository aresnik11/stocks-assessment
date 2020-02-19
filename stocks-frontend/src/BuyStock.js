import React from 'react'
import { Form } from 'semantic-ui-react'

class BuyStock extends React.Component {
    state = {
        ticker: "",
        quantity: ""
    }

    // controlled log in forrm
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // send submitted values to the backend
        this.props.buyStockSubmitHandler(this.state)
        // reset state
        this.setState({
            ticker: "",
            quantity: ""
        })
    }

    render() {
        return (
            <div>
                <h1>Cash - ${parseFloat(this.props.money).toFixed(2)}</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        name="ticker"
                        placeholder="Ticker"
                        required
                        value={this.state.ticker}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        name="quantity"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="Quantity"
                        required
                        value={this.state.quantity}
                        onChange={this.handleChange}
                    />
                    <Form.Button
                        content="Buy"
                    />
                </Form>
            </div>
        )
    }
}

export default BuyStock