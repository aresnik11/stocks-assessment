import React from 'react'
import { Form } from 'semantic-ui-react'

class Signup extends React.Component {
    state = {
        email: "",
        name: "",
        password: ""
    }

    // controlled sign up form
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        // send submitted values to the backend and update redux store
        this.props.signUpSubmitHandler(this.state)
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        name="name"
                        placeholder="Name"
                        required
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        name="email"
                        placeholder="Email"
                        required
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Form.Button
                        content="Sign Up"
                    />
                </Form>
            </div>
        )
    }
}

export default Signup