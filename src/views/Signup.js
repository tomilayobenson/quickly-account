import React from 'react'
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/signup/SignupForm'
import { Row, Col, Container, Button } from 'reactstrap'

const Signup = () => {
const navigate = useNavigate()
  return (
    <Container>
      <Row>
        <Col md={{ offset: 3, size: 6 }}>
        <h3 className="text-center display-4 mb-5">User Registration</h3>
          <SignupForm />
          <p className="text-center">If you already have an account,<Button color="link" onClick={() => {navigate('/')}}>login</Button>.</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup