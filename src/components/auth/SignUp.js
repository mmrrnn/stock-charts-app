import React, { useState } from 'react'

export default function SignUp() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [retypedPassword, setRetypedPassword] = useState('');
    
    return (
        <div className="container">
            <h2 class="text-center text-primary">Sign Up</h2>
            <div className="row justify-content-md-center">
                <div className="col-12 col-md-8 col-lg-6">
                    <form>
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
                                autoComplete="false"
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
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
                        </div>
                        <button type="submit" className="btn btn-primary float-right">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    )
}
