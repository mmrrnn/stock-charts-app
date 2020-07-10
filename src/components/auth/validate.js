import PropTypes from 'prop-types';

export const validate = ({ username, password, retypedPassword, signUpError, setsignUpError }) => {
    let isCorrect = true;

    if (username.length < 3 || /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
        setsignUpError({
            ...signUpError,
            username: true
        });

        isCorrect = false;
    }

    if (password.length < 3 || /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(password)) {
        setsignUpError({
            ...signUpError,
            password: true
        });

        isCorrect = false;
    }

    if (retypedPassword !== password) {
        setsignUpError({
            ...signUpError,
            retypedPassword: true
        });

        isCorrect = false;
    }

    return isCorrect;
}

validate.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    retypedPassword: PropTypes.string.isRequired,
    signUpError: PropTypes.object.isRequired,
    setSignUpError: PropTypes.func.isRequired
}