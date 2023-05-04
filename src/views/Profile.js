import React from 'react';
import { useNavigate } from 'react-router-dom';
import myAvatar from '../images/avatar.jpeg';
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { Row, Col, Container } from 'reactstrap'

const Profile = ({ store }) => {
  const navigate = useNavigate()
  const handleButton = () => {
    localStorage.removeItem('token');
    store.updateUser(null)
  }
  if (!store.user) {
    navigate('/')
  } else{
    return (
    <Container>
      <Row>
        <Col xs = {{offset:1, size:10}} md={{ offset: 4, size: 4 }}>
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
                Hey there, it's time to get to work.
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