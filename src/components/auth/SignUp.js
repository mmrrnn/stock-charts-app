import React, { useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { validate } from './validate';
import { addUser } from '../../data/actions/user-action';

function SignUp({ addUser, authorized }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [signUpError, setsignUpError] = useState({});
    
    const handleSubmit = useCallback(
        e => {
            e.preventDefault();

            const isDataCorrect = validate({ username, password, retypedPassword, signUpError, setsignUpError });
            
            if(isDataCorrect){
                addUser({
                    username,
                    password,
                    subscribedStock: null
                });
            }
        },
        [addUser, username, password, retypedPassword, signUpError]
    )

    if(authorized) return <Redirect to="/" />;

    return (
        <div className="container">
            <h2 className="text-center text-primary">Sign Up</h2>
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
                            {signUpError.username 
                                ? <div className="text-danger">Type correct username</div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                autoComplete="false"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            {signUpError.password 
                                ? <div className="text-danger">Type correct password</div>
                                : null}
                        </div>
                        <div className="form-group">
                            <label htmlFor="retypedPassword">Retype password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="retypedPassword"
                                autoComplete="false"
                                required
                                onChange={e => setRetypedPassword(e.target.value)}
                            />
                            {signUpError.retypedPassword
                                ? <div className="text-danger">Passwords must be the same</div>
                                : null}
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
    { addUser }
)(SignUp);