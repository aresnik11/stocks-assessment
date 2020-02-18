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
        // .then(() => {
        //     // if the sign up was successful, push to profile page
        //     if (this.props.currentUser) {
        //         this.props.history.push("/profile")
        //     }
        // })
    }

    render() {
        return (
            <div>
                <h1>Sign Up</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input
                        name="name"
                        placeholder="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        name="email"
                        placeholder="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <Form.Input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <Form.Button
                        className="btn"
                        content="Sign Up"
                    />
                </Form>
            </div>
        )
    }
}

export default Signup