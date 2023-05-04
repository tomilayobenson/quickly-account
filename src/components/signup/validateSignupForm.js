export const validateSignupForm = (values) => {
    const { email, password, firstName, confirmEmail, confirmPassword } = values;
    const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 
    const errors = {}

    if (!firstName) {
        errors.firstName = 'Required'
    }
    
    if (!email) {
        errors.email = 'Required'
    } else if(!email.match(pattern)){
        errors.email = 'Invalid email address'
    }else if (email !== confirmEmail) {
        errors.email = 'Emails do not match'
    }
    if (!password) {
        errors.password = 'Required'
    } else if (password.length < 6) {
        errors.password = 'Must be at least 6 characters'
    } else if (password !== confirmPassword) {
        errors.password = 'Paswords do not match'
    }
    return errors;
}