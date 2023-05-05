import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, FormGroup, Label, Button } from 'reactstrap';
import { validateSignupForm } from './validateSignupForm';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';
import { inject, observer } from 'mobx-react';

const SignupForm = ({ store }) => {
    const [isShown, setIsShown] = useState(false);
    const navigate = useNavigate()
    const togglePassword = () => {
        setIsShown(!isShown);
    };
    const handleSignup = async (values) => {
        const details = JSON.stringify({
            email: values.email,
            password: values.password,
            first_name: values.firstName,
            last_name: values.lastName,
            company: {
                name: values.company
            }
        });
        try {
            const response = await axios.post(`${baseUrl}auth/signup`, details,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            localStorage.setItem('token', response.data.token);
            try {
                const response = await axios.get(`${baseUrl}auth/user`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                // console.log(response)
                store.updateUser(response.data.user);
            } catch (error) {
                console.error(error);
                console.log('User fetch failed');
            }
        } catch (error) {
            console.error(error);
            console.log('User signup failed');
        }
    }
    useEffect(() => {
        if (store.user) {
            navigate('/profile');
        }
    }, [store.user])
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
                        <Field id='firstName' name='firstName' placeholder='First Name' className='form-control' aria-label="first name" aria-required={true} />
                        <ErrorMessage name='firstName' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </Col>
                    <Col md={6}>
                        <Label htmlFor='lastName'>Last Name</Label>
                        <Field id='lastName' name='lastName' placeholder='Last Name' className='form-control' aria-label="last name" aria-required={true} />
                        <ErrorMessage name='lastName' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={6}>
                        <Label htmlFor='email'>
                            Email
                        </Label>
                        <Field id='email' name='email' type="email" placeholder='Email' className='form-control' data-testid="signup-component" aria-label="email" aria-required={true} />
                        <ErrorMessage name='email' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </Col>
                    <Col md={6}>
                        <Label htmlFor='confirmEmail'>
                            Confirm Email
                        </Label>
                        <Field id='confirmEmail' name='confirmEmail' type="email" placeholder='Retype email' className='form-control' aria-label="confirm email" aria-required={true} />
                    </Col>
                </FormGroup>
                <FormGroup row>
                    <Col md={6}>
                        <Label htmlFor='password'>
                            Password
                        </Label>
                        <Field id='password' name='password' placeholder='Password' className='form-control' type={isShown ? 'text' : 'password'} aria-label="password" aria-required={true} />
                        <ErrorMessage name='password' >
                            {(msg) => <p className='text-danger marginB'> {msg}</p>}
                        </ErrorMessage>
                        <label htmlFor="checkBox">Show password? </label>
                        <input
                            name='checkBox'
                            id="checkBox"
                            type="checkbox"
                            checked={isShown}
                            onChange={togglePassword}
                            className="marginL"
                        />
                    </Col>
                    <Col md={6}>
                        <Label htmlFor='confirmPassword'>
                            Confirm Password
                        </Label>
                        <Field id='confirmPassword' name='confirmPassword' placeholder='Retype password' className='form-control' type={isShown ? 'text' : 'password'} aria-label="confirm password" aria-required={true} />
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="company">Comapny Name</Label>
                    <Field name="company" className="form-control" id="company" aria-label="company name" aria-required={true} />
                    <ErrorMessage name='company' >
                        {(msg) => <p className='text-danger'> {msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <div className="text-center">
                    <Button type='submit' color='primary' role="button" >Signup</Button>
                </div>
            </Form>

        </Formik>
    )
}

export default inject('store')(observer(SignupForm));