import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';

import { Ul } from './Navigation.css';
import { signOutUser } from '../../data/actions/user-action';

function SignedInLinks({ signOutUser }) {
    const location = useLocation();
    
    return (
        <>
            <Ul>
                <li className={location.pathname === '/' ? 'active' : null}>
                    <Link to="/">Charts</Link>
                </li>
                <li className={location.pathname === '/subscribed' ? 'active' : null}>
                    <Link to="/subscribed">Subscribed</Link>
                </li>
            </Ul>
            <button onClick={signOutUser} href="#">Sign Out</button>   
        </>
    )
}

SignedInLinks.propTypes = {
    signOutUser: PropTypes.func.isRequired,
}

export default connect(null, { signOutUser })(SignedInLinks);