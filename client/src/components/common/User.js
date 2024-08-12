import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

export default function User(props) {

  const { email, fullname, profile_picture, book_count } = props.user


  return (
    <Container className="mt-5">
      <Card className='!shadow-lg !shadow-slate-300'>
        <Card.Body className="flex items-center justify-center">
          <Card.Img src={profile_picture} className="rounded-circle h-32 w-32 object-cover" alt="Profile image" style={{ width: '128px', height: '128px' }} />
          <div className="ml-8">
            <div className="flex flex-row gap-x-8 my-3">
              <Card.Text><b>{book_count}</b> Posts</Card.Text>
              <Card.Text><b>0</b> Followers</Card.Text>
              <Card.Text><b>0</b> Following</Card.Text>
            </div>
            <Card.Title>{fullname}</Card.Title>
            <Card.Text>{email}</Card.Text>
            <Button className="w-40 !bg-rose-500 !border-none !shadow-md !shadow-rose-300 !rounded-full mb-3" size="sm">Edit Profile</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
