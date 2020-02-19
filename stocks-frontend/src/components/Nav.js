import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Nav extends React.Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const { activeItem } = this.state
    
        return (
            <Menu pointing secondary stackable size="huge">
                <Menu.Item
                    as={ Link }
                    to="/"
                    icon="chart line"
                    name="super stocks"
                    active={activeItem === 'super stocks'}
                    onClick={this.handleItemClick}
                />
                <Menu.Item
                    as={ Link }
                    to="/portfolio"
                    name='portfolio'
                    active={activeItem === 'portfolio'}
                    onClick={this.handleItemClick}
                />            
                <Menu.Item
                    as={ Link }
                    to="/transactions"
                    name='transactions'
                    active={activeItem === 'transactions'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    {/* if user is logged in, show log out. otherwise show log in and sign up */}
                    {localStorage.token
                    ?
                    <Menu.Item
                        name="log out"
                        active={this.state.activeItem === "log out"}
                        onClick={this.props.logOut}
                    />
                    :
                    <>
                        <Menu.Item
                            as={ Link }
                            to="/login"
                            name="log in"
                            active={this.state.activeItem === "log in"}
                            onClick={this.handleItemClick}
                        />
                        <Menu.Item
                            as={ Link }
                            to="/signup"
                            name="sign up"
                            active={this.state.activeItem === "sign up"}
                            onClick={this.handleItemClick}
                        />
                    </>
                    }
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Nav
