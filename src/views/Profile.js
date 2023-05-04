import React from 'react';
import { useNavigate } from 'react-router-dom';
import myAvatar from '../images/avatar.jpeg';
import { Row, Col, Container, Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';

const Profile = ({ store }) => {
  const navigate = useNavigate();
  const handleButton = () => {
    localStorage.removeItem('token');
    store.updateUser(null)
  }
  if (!store.user) {
    return (
      <Container>
        <Row>
          <Col md={{ offset: 4, size: 4 }} className='align-items-center'>
            <h3 className="text-center display-5 mb-5">Error 401</h3>
            <p className="text-center">User is currently not logged in.</p>
            <div className="text-center">
              <Button color="primary" onClick={() => { navigate('/') }}>Login</Button>
            </div>

          </Col>
        </Row>
      </Container>
    )
  } else {
    return (
      <Container>
        <Row>
          <Col xs={{ offset: 1, size: 10 }} md={{ offset: 4, size: 4 }}>
            <h3 className="text-center display-5">User Profile</h3>
            <Card
              style={{
                width: '100%'
              }}
            >
              <img
                alt="Generic avatar"
                src={myAvatar}
              />
              <CardBody>
                <CardTitle tag="h5">
                  {store.user.full_name}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  {store.user.email}
                </CardSubtitle>
                <CardText>
                  I currently work with {store.user.Company.name}
                </CardText>
                <Button onClick={handleButton}>
                  Signout
                </Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

    )
  }
}

export default inject('store')(observer(Profile));