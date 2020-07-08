import {
    USER_ADD,
    SIGN_IN,
    SIGN_OUT,
    TOGGLE_SUBSCRIBE_STOCK,
} from '../constants';

export const addUser = user => {
    const promise = fetch(
        `http://localhost:5000/users/add`,
        {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify(user)
        }
    );
    
    return {
        type: USER_ADD,
        promise,
        successMessage: `User ${user.username} has been added!`,
        failureMessage: `Sign Up error, check the console!`
    }
}

export const signInUser = ({ username, password }) => {
    const promise = fetch(
        `http://localhost:5000/users/signin`,
        {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ username, password })
        }
    )
    
    return {
        type: SIGN_IN,
        promise,
        failureMessage: `Sign In error, check the console!`
    }
}

export const signOutUser = () => {
    return {
        type: SIGN_OUT,
        failureMessage: "Sign Out error, check the console!"
    }
}

export const toggleSubscribeStock = ({ stockSymbol, username }) => {
    const promise = fetch(
        `http://localhost:5000/users/subscribe`,
        {
            method: "POST",
            headers: {
                'Content-type': "application/json"
            },
            body: JSON.stringify({ subscribedStock: stockSymbol, username })
        }
    )
    
    return {
        type: TOGGLE_SUBSCRIBE_STOCK,
        promise,
        failureMessage: `Subscribing stock error, check the console!`
    }
}