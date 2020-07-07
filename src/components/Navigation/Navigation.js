import React from 'react';
import { connect } from 'react-redux';

import { Nav } from './Navigation.css';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

function Navigation({ authorized }) {
    return (
        <Nav className="navbar navbar-light bg-light">
            {authorized ? <SignedInLinks /> : <SignedOutLinks />}
        </Nav>
    )
}

export default connect(
    state => {
        return {
            authorized: state.user.authorized
        }
    } 
)(Navigation);