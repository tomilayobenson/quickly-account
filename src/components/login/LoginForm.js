import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormGroup, Label, Button } from 'reactstrap';
import { validateLoginForm } from './validateLoginForm';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

const LoginForm = () => {
    const [user, setUser] = useState(null);
    const [isShown, setIsShown] = useState(false);
    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    };
    const handleLogin = async (values) => {
        // const token = localStorage.getItem('token')
        const response = await axios.post(`${baseUrl}auth/login`,
            {
                email: values.email,
                password: values.password
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
                email: '',
                password: ''

            }}

            onSubmit={handleLogin}
            validate={validateLoginForm}

        >
            <Form>
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
                    <Field id='password' name='password' placeholder='Password' className='form-control' type={isShown ? 'text' : 'password'} />
                    <ErrorMessage name='password' >
                        {(msg) => <p className='text-danger'> {msg}</p>}
                    </ErrorMessage>
                    <label htmlFor="checkBox">Show password?</label>
                    <input
                        name='checkBox'
                        id="checkBox"
                        type="checkbox"
                        checked={isShown}
                        onChange={togglePassword}
                    />
                </FormGroup>
                <div className="text-center">
                    <Button type='submit' color='primary' > Login</Button>
                </div>
            </Form>

        </Formik>
    )
}

export default LoginForm