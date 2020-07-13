import PropTypes from 'prop-types';

export const validate = ({ username, password, retypedPassword }) => {
    let errorObject = {};

    if (!/^[a-z0-9_-]{3,16}$/.test(username)) {
        errorObject = {
            username: true
        }
    }

    if (!/^[a-z0-9_-]{4,18}$/.test(password)) {
        errorObject = {
            ...errorObject,
            password: true
        }
    }

    if (retypedPassword !== password) {
        errorObject = {
            ...errorObject,
            retypedPassword: true
        }
    }

    return errorObject;
}

validate.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    retypedPassword: PropTypes.string.isRequired
}