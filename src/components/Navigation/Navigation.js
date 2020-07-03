import React from 'react';

import { Nav } from './Navigation.css';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

function Navigation({ logged }) {
    return (
        <Nav className="navbar navbar-light bg-light">
            <SignedOutLinks />
        </Nav>
    )
}

export default Navigation;