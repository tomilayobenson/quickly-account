import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Row, Col, FormGroup, Label, Button } from 'reactstrap';
import { validateLoginForm } from './validateLoginForm';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

const LoginForm = ({store}) => {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    };
    const handleLogin = async (values) => {
        try {
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
            localStorage.setItem('token', response.data.token);
            
            try {
                const response = await axios.get(`${baseUrl}auth/user`,
                    {
                        headers: {
                            'Authorization':`Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                // console.log(response)
                store.updateUser(response.data.user);
            } catch(error) {
                console.error(error);
                console.log('User fetch failed');
            }

        } catch (error) {
            console.error(error);
            console.log('User login failed');
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
                email: '',
                password: ''

            }}

            onSubmit={handleLogin}
            validate={validateLoginForm}
        >
            <Form >
                <FormGroup>
                    <Label htmlFor='email' data-testid="login-component">
                        Email
                    </Label>
                    <Field id='email' name='email' type="email" placeholder='Email' className='form-control' aria-label="email" aria-required={true}/>
                    <ErrorMessage name='email' >
                        {(msg) => <p className='text-danger'> {msg}</p>}
                    </ErrorMessage>
                </FormGroup>

                <FormGroup>
                    <Label htmlFor='password'>
                        Password
                    </Label>
                    <Field id='password' name='password' placeholder='Password' className='form-control' type={isShown ? 'text' : 'password'} aria-label="password" aria-required={true}/>
                    <ErrorMessage name='password' >
                        {(msg) => <p className='text-danger marginB'> {msg}</p>}
                    </ErrorMessage>
                    <label htmlFor="checkBox">Show password?</label>
                    <input
                        name='checkBox'
                        id="checkBox"
                        type="checkbox"
                        checked={isShown}
                        onChange={togglePassword}
                        className="marginL"
                    />
                </FormGroup>
                <div className="text-center">
                    <Button type='submit' color='primary' role="button" > Login</Button>
                </div>
            </Form>

        </Formik>
    )
}

export default inject('store')(observer(LoginForm));