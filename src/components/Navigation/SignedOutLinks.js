import React from 'react';
import { Link } from 'react-router-dom';

import { Ul } from './Navigation.css';

function SignedOutLinks() {
    return (
        <>
            <div id="stock-charts-brand">Stock Charts</div>
            <Ul>
                <li>
                    <Link to="signin">Sign In</Link>
                </li>
                <li>
                    <Link to="signup">Sign Up</Link>
                </li>
            </Ul>
        </>
    )
}

export default SignedOutLinks;