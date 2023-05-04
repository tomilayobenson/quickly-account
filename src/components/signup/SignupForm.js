import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Col, FormGroup, Label, Button } from 'reactstrap';
import { validateSignupForm } from './validateSignupForm';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

const SignupForm = () => {
    const [user, setUser] = useState(null);
    const handleSignup = async (values) => {
        // const token = localStorage.getItem('token')        
        const response = await axios.post(`${baseUrl}auth/signup`,
            {
                email: values.email,
                password: values.password,
                first_name: values.firstName,
                last_name:values.lastName,
                company: {
                    name:values.company
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
                password: '',
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
                        <ErrorMessage name='lastName' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor='email'>
                        Email
                    </Label>
                    <Field id='email' name='email' type="email" placeholder='Email' className='form-control' />
                    <ErrorMessage name='email' >
                        {(msg) => <p className='text-danger'> {msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='password'>
                        Password
                    </Label>
                    <Field id='password' name='password' placeholder='Password' className='form-control' />
                    <ErrorMessage name='password' >
                        {(msg) => <p className='text-danger'> {msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="company">Comapny Name</Label>
                    <Field name="company" className="form-control" id="company" />
                    <ErrorMessage name='company'>
                        {(msg) => <p className='text-danger'>{msg}</p>}
                    </ErrorMessage>
                </FormGroup>
                <div className="text-center">
                    <Button type='submit' color='primary' > Login</Button>
                </div>
            </Form>

        </Formik>
    )
}

export default SignupForm