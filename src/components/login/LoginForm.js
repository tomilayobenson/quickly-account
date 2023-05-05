import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormGroup, Label, Button } from 'reactstrap';
import { validateLoginForm } from './validateLoginForm';
import { inject, observer } from 'mobx-react';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

const LoginForm = ({ store }) => {
    const navigate = useNavigate();
    const [isShown, setIsShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState(null)
    const togglePassword = () => {
        setIsShown((isShown) => !isShown);
    };
    const handleLogin = async (values) => {
        setIsLoading(true)
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
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                // console.log(response)
                setIsLoading(false)
                setResponseMessage({ ok: true, message: "You are successfully signed in!" })
                store.updateUser(response.data.user);
            } catch (error) {
                setIsLoading(false)
                console.error(error);
                console.log('User fetch failed');
                setResponseMessage({ ok: false, message: "Internal server error. Please try again." })
            }

        } catch (error) {
            setIsLoading(false)
            console.error(error);
            console.log('User login failed');
            setResponseMessage({ ok: false, message: "User email or password incorrect. Please try again." })
        }
    }
    useEffect(() => {
        if (store.user) {
            setTimeout(() => {
                setResponseMessage(null)
                navigate('/profile');
            }, "1000");
        }
    }, [store.user])
    return (
        <>
            {responseMessage ? (responseMessage.ok ?
                (<div className="alert alert-success">
                    <strong>Success!</strong> {responseMessage.message}
                </div>) :
                (<div className="alert alert-danger">
                    <strong>Error!</strong> {responseMessage.message}
                </div>)) : null
            }
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
                        <Field id='email' name='email' type="email" placeholder='Email' className='form-control' aria-label="email" aria-required={true} />
                        <ErrorMessage name='email' >
                            {(msg) => <p className='text-danger'> {msg}</p>}
                        </ErrorMessage>
                    </FormGroup>

                    <FormGroup>
                        <Label htmlFor='password'>
                            Password
                        </Label>
                        <Field id='password' name='password' placeholder='Password' className='form-control' type={isShown ? 'text' : 'password'} aria-label="password" aria-required={true} />
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
                        {isLoading && <i className='fa fa-spinner fa-pulse fa-lg fa-fw text-primary mx-3' />}
                        <Button type='submit' color='primary' role="button" className="" > Login</Button>
                    </div>
                </Form>

            </Formik>
        </>
    )
}

export default inject('store')(observer(LoginForm));