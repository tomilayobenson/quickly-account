import React from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/login/LoginForm'
import { Row, Col, Container,Button } from 'reactstrap'

const Login = () => {
  const navigate = useNavigate()
  return (
    <Container>
      <Row>
      <h3 className="text-center display-4">User Sign In</h3>
        <Col md={{ offset: 3, size: 6 }}>
          <LoginForm />
          <p>If you do not have an account, <Button color="link" onClick={() => {navigate('/signup')}}>signup</Button></p>
        </Col>
      </Row>
    </Container>
  )
}

export default Login