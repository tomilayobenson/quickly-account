import React from 'react';
import myAvatar from '../images/avatar.jpeg';
import { Card, CardBody,CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';

const Profile = ({ store }) => {
  const handleButton=()=>{
    localStorage.removeItem('token');
    store.updateUser(null)    
  }
  return (
    <Card
      style={{
        width: '18rem'
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
  )
}

export default inject('store')(observer(Profile));