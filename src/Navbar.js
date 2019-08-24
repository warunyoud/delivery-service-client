import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Navbar.css';

const navbarMenuItems = [
  { text: 'Route Cost', link: './routeCost' },
  { text: 'Number Of Routes', link: './numberOfRoutes' },
  { text: 'Cheapest Cost', link: './cheapestCost' }
]

class Navbar extends Component {
  render() {
    return (
      <header className='navbar'>
        <div className='navbar__center'>
          <div className='navbar__logo'>
            <h1> deliveryService </h1>
          </div>
          <nav className='navbar__menu'>
            {
              navbarMenuItems.map((item, index) => (
                <a
                  href={ item.link }
                  onClick={ (event) => this.props.setIndex(event, index) }
                  className='navbar__menu__unit'>
                  { item.text }
                </a>
              ))
            }
          </nav>
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  setIndex: PropTypes.func.isRequired
}

export default Navbar;
