import React from 'react'
import { Form } from 'semantic-ui-react'

class Login extends React.Component {
    state = {
        email: "",
        password: ""
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
        this.props.loginSubmitHandler(this.state)
        // reset state
        this.setState({
            email: "",
            password: ""
        })
        // .then(() => {
        //     // if the log in was successful, push to profile page
        //     if (this.props.currentUser) {
        //         this.props.history.push("/profile")
        //     }
        // })
    }

    render() {
        return (
            <div>
                <h1>Log In</h1>
                <Form onSubmit={this.handleSubmit}>
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
                        content="Log In"
                    />
                </Form>
            </div>
        )
    }
}

export default Login