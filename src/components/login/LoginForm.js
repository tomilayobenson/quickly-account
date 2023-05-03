import React from 'react';
import { Formik,Form, Field, ErrorMessage } from 'formik';
import { Row, Col,FormGroup, Label, Button } from 'reactstrap';
import { validateLoginForm } from './ValidateLoginForm';

const LoginForm = () => {
    const handleLogin=(values)=> {

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
          <Field id='password' name='password' placeholder='Password' className='form-control' />
          <ErrorMessage name='password' >
            {(msg) => <p className='text-danger'> {msg}</p>}
          </ErrorMessage>
        </FormGroup>
        <div className="text-center">
          <Button type='submit' color='primary' > Login</Button>
        </div>
      </Form>

    </Formik>
  )
}

export default LoginForm