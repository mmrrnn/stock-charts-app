import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { signInUser } from '../../data/actions/user-action';

function SignIn({ signInUser, authorized }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    if (authorized) return <Redirect to='/' />;

    const handleSubmit = e => {
        e.preventDefault();
        
        signInUser({ username, password });
    }

    return (
        <div className="container">
            <h2 className="text-center text-primary">Sign In</h2>
            <div className="row justify-content-md-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                aria-describedby="usernameHelp"
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                autoComplete="true"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default connect(
    state => {
        return {
            authorized: state.user.authorized
        }
    },
    { signInUser }
)(SignIn);