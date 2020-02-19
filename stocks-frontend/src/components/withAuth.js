import React from 'react'
import { Redirect } from 'react-router-dom'
import Loading from './Loading'

function withAuth(MyComponent) {
    class AuthHOC extends React.Component {
        render() {
            // check if there is a user
            if (this.props.user) {
                // if there is a user, render the target component
                return (
                    <MyComponent {...this.props} />
                )
            }
            else {
                // if there isn't, check for a token. its presence indicates that the user is in fact logged in and the fetch from your componentDidMount is still running, so display a loader, otherwise redirect to login page
                if (localStorage.token) {
                    return <Loading />
                }
                else {
                    return <Redirect to="/login" />
                }
            }
        }
    }
    return AuthHOC
}

export default withAuth