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
        // send submitted values to the backend
        this.props.signUpSubmitHandler(this.state)
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <br/>
                <Form onSubmit={this.handleSubmit} className="login">
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
                        type="email"
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
                    <br/>
                    <Form.Button
                        size="large"
                        color="black"
                        content="Sign Up"
                    />
                </Form>
            </div>
        )
    }
}

export default Signup