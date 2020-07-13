import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Ul } from './Navigation.css';

function SignedOutLinks() {
    const location = useLocation();
    
    return (
        <>
            <div id="stock-charts-brand">
                <Link to="/">Stock Charts</Link>
            </div>
            <Ul>
                <li className={location.pathname === '/signin' ? 'active' : null}>
                    <Link to="/signin">Sign In</Link>
                </li>
                <li className={location.pathname === '/signup' ? 'active' : null}>
                    <Link to="/signup">Sign Up</Link>
                </li>
            </Ul>
        </>
    )
}

export default SignedOutLinks;