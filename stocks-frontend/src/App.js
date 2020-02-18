import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch } from 'react-router-dom'
import Login from './Login'
import Signup from './Signup'
import Portfolio from './Portfolio'
import Error from './Error'

class App extends React.Component {
  state = {
    loading: true,
    user: null,
    stocks: null
  }

  componentDidMount() {
    // if there is a token in localStorage, see if we can autologin the user
    if (localStorage.getItem("token")) {
      this.autoLogin()
    }
  }

  autoLogin = () => {
    fetch("http://localhost:3001/api/v1/auto_login", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        this.logOut()
      }
      else {
        this.setState({
          user: {
            id: response.user.id,
            email: response.user.email
          },
          stocks: response.user.stocks
        })
      }
    })
  }

  logOut = () => {
    localStorage.removeItem("token")
    this.setState({
      user: null,
      stocks: null
    })
  }

  // creates a new user in backend with userInfo provided, sets token in localStorage and sets state with user info if successful
  signUpSubmitHandler = (userInfo) => {
    fetch("http://localhost:3001/api/v1/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      }
      else {
        localStorage.setItem("token", response.token)
        this.setState({
          user: {
            id: response.user.id,
            email: response.user.email
          },
          stocks: response.user.stocks
        }, () => this.props.history.push("/portfolio"))
      }
    })
  }

  // verifies if userInfo provided matches user in backend, sets token in localStorage and sets state with user info if successful
  loginSubmitHandler = (userInfo) => {
    fetch("http://localhost:3001/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({user: userInfo})
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      }
      else {
        localStorage.setItem("token", response.token)
        this.setState({
          user: {
            id: response.user.id,
            email: response.user.email
          },
          stocks: response.user.stocks
        }, () => this.props.history.push("/portfolio"))
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/login" render={() => <Login loginSubmitHandler={this.loginSubmitHandler} />} />
          <Route exact path="/signup" render={() => <Signup signUpSubmitHandler={this.signUpSubmitHandler} />} />
          <Route exact path="/portfolio" render={() => <Portfolio user={this.state.user} />} />
          {/* <Route exact path="/transactions" render={() => <Transactions />} /> */}
          <Route component={Error} />
        </Switch>
      </div>
    )
  }
}

export default App
