import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import { Route, Switch } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import PortfolioContainer from './containers/PortfolioContainer'
import Error from './components/Error'
import TransactionsContainer from './containers/TransactionsContainer'
import Nav from './components/Nav'
import Homepage from './components/Homepage'

class App extends React.Component {
  state = {
    loading: true,
    user: null
  }

  componentDidMount() {
    // if there is a token in localStorage, see if we can autologin the user
    if (localStorage.getItem("token")) {
      this.autoLogin()
    }
  }

  // if we can decode the token in localstorage, set the user in state accordingly, otherwise remove the token
  autoLogin = () => {
    fetch("https://super-stocks-backend.herokuapp.com/api/v1/auto_login", {
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
          user: response.user
        })
      }
    })
  }

  // removes token from localstorage and removes user info stored in state on log out
  logOut = () => {
    localStorage.removeItem("token")
    this.setState({
      user: null
    })
  }

  // creates a new user in backend with userInfo provided, sets token in localStorage and sets state with user info if successful
  signUpSubmitHandler = (userInfo) => {
    fetch("https://super-stocks-backend.herokuapp.com/api/v1/signup", {
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
          user: response.user
        }, () => this.props.history.push("/portfolio"))
      }
    })
  }

  // verifies if userInfo provided matches user in backend, sets token in localStorage and sets state with user info if successful
  loginSubmitHandler = (userInfo) => {
    fetch("https://super-stocks-backend.herokuapp.com/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
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
          user: response.user
        }, () => this.props.history.push("/portfolio"))
      }
    })
  }

  // creates a new stock in the backend for the user for the ticker and quantity requested
  buyStockSubmitHandler = (stockInfo) => {
    fetch("https://super-stocks-backend.herokuapp.com/api/v1/stocks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({stock: stockInfo})
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      }
      else {
        this.setState({
          user: response.user
        })
      }
    })
  }

  // gets the most up to date pricing info for stocks in the users portfolio
  refreshStocks = () => {
    fetch("https://super-stocks-backend.herokuapp.com/api/v1/refresh_stocks", {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(resp => resp.json())
    .then(response => {
      if (response.errors) {
        alert(response.errors)
      }
      else {
        this.setState({
          user: response.user
        })
      }
    })
  }

  render() {
    return (
      <div className="App">
        {/* nav shows on every page */}
        <Nav logOut={this.logOut} />
        <div className="main-container">
          <Switch>
            <Route exact path="/login" render={() => <Login loginSubmitHandler={this.loginSubmitHandler} />} />
            <Route exact path="/signup" render={() => <Signup signUpSubmitHandler={this.signUpSubmitHandler} />} />
            <Route exact path="/portfolio" render={() => <PortfolioContainer user={this.state.user} buyStockSubmitHandler={this.buyStockSubmitHandler} refreshStocks={this.refreshStocks} />} />
            <Route exact path="/transactions" render={() => <TransactionsContainer user={this.state.user} />} />
            <Route exact path="/" render={() => <Homepage />} />
            <Route component={Error} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App
