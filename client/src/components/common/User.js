import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import defaultPersonImage from '../../assets/images/core-images/default_person.jpg'; // Ensure this path is correct

export default function User() {
  return (
    <Container className="mt-5">
      <Card className='!shadow-lg !shadow-slate-300'>
        <Card.Body className="flex items-center justify-center">
          <Card.Img src={defaultPersonImage} className="rounded-circle h-32 w-32 object-cover" alt="Profile image" style={{ width: '128px', height: '128px' }} />
          <div className="ml-8">
            <div className="flex flex-row gap-x-8 my-3">
              <Card.Text><b>0</b> Posts</Card.Text>
              <Card.Text><b>0</b> Followers</Card.Text>
              <Card.Text><b>0</b> Following</Card.Text>
            </div>
            <Card.Title>Sudipta Bhatta</Card.Title>
            <Card.Text>sudiptabhatta@gmail.com</Card.Text>
            <Button className="w-40 !bg-rose-500 !border-none !shadow-md !shadow-rose-300 !rounded-full mb-3" size="sm">Edit Profile</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
