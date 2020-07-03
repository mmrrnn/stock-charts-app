import React from 'react';
import { Link } from 'react-router-dom';

import { Ul } from './Navigation.css';

function SignedInLinks() {
    return (
        <>
            <Ul>
                <li>
                    <Link to="/charts">Charts</Link>
                </li>
                <li>
                    <Link to="/subscribed">Subscribed</Link>
                </li>
            </Ul>
            <div>Sign Out</div>
        </>
    )
}

export default SignedInLinks;