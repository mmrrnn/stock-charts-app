import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { validate } from './validate';
import { addUser } from '../../data/actions/userActions';

const getInputClassName = ({ inputName, errorObject }) => {
    return `form-control ${inputName in errorObject ? 'is-invalid' : ''}`;
}

function SignUp({ authorized, addUser }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    const [signUpError, setsignUpError] = useState({});

    const handleSubmit = useCallback(
        e => {
            e.preventDefault();
            const errorObject = validate({ username, password, retypedPassword });
            const isDataCorrect = Object.keys(errorObject).length === 0;

            if (isDataCorrect) {
                addUser({
                    username,
                    password,
                    subscribedStock: null
                });
            } else {
                setsignUpError(errorObject);
            }
        },
        [addUser, username, password, retypedPassword]
    )

    if (authorized) return <Redirect to="/" />;

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
                                className={
                                    getInputClassName({
                                        inputName: 'username',
                                        errorObject: signUpError
                                    })
                                }
                                id="username"
                                aria-describedby="usernameHelp"
                                required
                                onChange={e => setUsername(e.target.value)}
                            />
                            <div className="invalid-feedback">
                                Please provide a valid username.
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className={
                                    getInputClassName({
                                        inputName: 'password',
                                        errorObject: signUpError
                                    })
                                }
                                id="password"
                                autoComplete="false"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className="invalid-feedback">
                                Please provide a valid password.
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="retypedPassword">Retype password</label>
                            <input
                                type="password"
                                className={
                                    getInputClassName({
                                        inputName: 'retypedPassword',
                                        errorObject: signUpError
                                    })
                                }
                                id="retypedPassword"
                                autoComplete="false"
                                required
                                onChange={e => setRetypedPassword(e.target.value)}
                            />
                            <div className="invalid-feedback">
                                Passwords must be the same.
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

SignUp.propTypes = {
    authorized: PropTypes.bool.isRequired,
    addUser: PropTypes.func.isRequired
}

export default connect(
    state => {
        return {
            authorized: state.user.authorized
        }
    },
    { addUser }
)(SignUp);