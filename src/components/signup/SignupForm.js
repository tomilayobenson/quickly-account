import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, FormGroup, Label, Button } from 'reactstrap';
import { validateSignupForm } from './validateSignupForm';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

const SignupForm = () => {
    const [user, setUser] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const togglePassword = () => {
        setIsShown(!isShown);
    };
    const handleSignup = async (values) => {
        const response = await axios.post(`${baseUrl}auth/signup`,
            {
                email: values.email,
                password: values.password,
                first_name: values.firstName,
                last_name: values.lastName,
                company: {
                    name: values.company
                }
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        if (!response.ok) throw Error(response.message);
        const data = await response.json();
        console.log(data);
        localStorage.setItem('token', data.jwtToken);
        setUser(data.user);
    }
    return (
        <Formik

            initialValues={{
                firstName: '',
                lastName: '',
                email: '',
                confirmEmail: '',
                password: '',
                confirmPassword: '',
                company: ''

            }}

            onSubmit={handleSignup}
            validate={validateSignupForm}

        >
            <Form>
                <FormGroup row>
                    <Col md={6}>
                        <Label htmlFor='firstName'>First Name</Label>
                        <Field id='firstName' name='firstName' placeholder='First Name' className='form-control' />
                        <ErrorMessage name='firstName' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </Col>
                    <Col md={6}>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Field id='lastName' name='lastName' placeholder='Last Name' className='form-control' />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={6}>
                        <Label htmlFor='email'>
                            Email
                        </Label>
                        <Field id='email' name='email' type="email" placeholder='Email' className='form-control' />
                        <ErrorMessage name='email' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </Col>
                    <Col md={6}>
                        <Label htmlFor='confirmEmail'>
                            Confirm Email
                        </Label>
                        <Field id='confirmEmail' name='confirmEmail' type="email" placeholder='Retype email' className='form-control' />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={6}>
                        <Label htmlFor='password'>
                            Password
                        </Label>
                        <Field id='password' name='password' placeholder='Password' className='form-control' type={isShown ? 'text' : 'password'} />
                        <ErrorMessage name='password' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </Col>
                    <Col md={6}>
                        <Label htmlFor='confirmPassword'>
                            Confirm Password
                        </Label>
                        <Field id='confirmPassword' name='confirmPassword' placeholder='Retype password' className='form-control' type={isShown ? 'text' : 'password'} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <label htmlFor="checkBox">Show password?</label>
                    <input
                        name='checkBox'
                        id="checkBox"
                        type="checkbox"
                        checked={isShown}
                        onChange={togglePassword}
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="company">Comapny Name</Label>
                    <Field name="company" className="form-control" id="company" />
                </FormGroup>
                <div className="text-center">
                    <Button type='submit' color='primary' > Login</Button>
                </div>
            </Form>

        </Formik>
    )
}

export default SignupForm