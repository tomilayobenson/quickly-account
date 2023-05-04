export const validateLoginForm = (values) => {
    const { email, password } = values;
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    const errors = {};

    if (!email) {
        errors.email = 'Required'
    } else if (!email.match(pattern)) {
        errors.email = 'Invalid email address'
    }
    if (!password) {
        errors.password = 'Required'
    }
    return errors;
}