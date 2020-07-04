export const validate = ({ username, password, retypedPassword, signUpError, setsignUpError }) => {
    let isCorrect = true;

    if (username.length < 3 || /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
        setsignUpError({
            signUpError,
            username: true
        });

        isCorrect = false;
    }

    if (password.length < 3 || /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(password)) {
        setsignUpError({
            signUpError,
            password: true
        });

        isCorrect = false;
    }

    if (retypedPassword !== password) {
        setsignUpError({
            signUpError,
            retypedPassword: true
        });

        isCorrect = false;
    }

    return isCorrect;
}