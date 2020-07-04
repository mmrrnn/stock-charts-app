import {
    USER_ADD
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
        failureMessage: `ERROR, check the console!`
    }
}