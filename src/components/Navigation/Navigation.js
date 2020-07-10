import React from 'react';
import PropTypes from 'prop-types';
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


Navigation.propTypes = {
    authorized: PropTypes.bool.isRequired,
}

export default connect(
    state => {
        return {
            authorized: state.user.authorized
        }
    } 
)(Navigation);