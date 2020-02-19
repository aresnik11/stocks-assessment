import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

class Nav extends React.Component {
    state = {}

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    
    render() {
        const { activeItem } = this.state
    
        return (
            <Menu fixed sticky>
                <Menu.Item
                    as={ Link }
                    to="/portfolio"
                    name='Portfolio'
                    active={activeItem === 'Portfolio'}
                    onClick={this.handleItemClick}
                />            
                <Menu.Item
                    as={ Link }
                    to="/transactions"
                    name='Transactions'
                    active={activeItem === 'Transactions'}
                    onClick={this.handleItemClick}
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='Log Out'
                        active={activeItem === 'Log Out'}
                        onClick={this.props.logOut}
                    />
                </Menu.Menu>
            </Menu>
        )
    }
}

export default Nav
