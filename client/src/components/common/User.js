import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ProfilePictureUpdateDelete from '../../pages/ProfilePictureUpdateDelete';
import FollowerList from '../../pages/FollowerList';
import FollowingList from '../../pages/FollowingList';

export default function User(props) {

  const { email, fullname, profile_picture, book_count } = props.user

  const [show, setShow] = useState(false);

  const [followerListShow, setFollowerListShow] = useState(false);
  const [followingListShow, setFollowingListShow] = useState(false);

  const handleProPicUpdateDeleteModalShow = () => {
    setShow(true)
  }

  const handleFollowerListClick = () => {
    setFollowerListShow(true)
  }

  const handleFollowingListClick = () => {
    setFollowingListShow(true)
  }

  return (
   <>
     <Container className="mt-5">
      <Card className='!shadow-sm'>
        <Card.Body className="flex items-center justify-center">
          <Card.Img src={profile_picture} className="rounded-circle h-32 w-32 object-cover cursor-pointer" alt="Profile image" style={{ width: '128px', height: '128px' }} 
            onClick={handleProPicUpdateDeleteModalShow}
          />
          <div className="ml-8">
            <div className="flex flex-row gap-x-8 my-3">
              <Card.Text><b>{book_count}</b> Posts</Card.Text>
              <Card.Text onClick={handleFollowerListClick} className='cursor-pointer'><b>0</b> Followers</Card.Text>
              <Card.Text className='cursor-pointer' onClick={handleFollowingListClick}><b>0</b> Following</Card.Text>
            </div>
            <Card.Title>{fullname}</Card.Title>
            <Card.Text>{email}</Card.Text>
            <Button className="w-40 !bg-gray-950 !border-none !shadow-sm !shadow-gray-800 !rounded-full mb-3" size="sm">Edit Profile</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>

    <ProfilePictureUpdateDelete show={show} setShow={setShow} user={props.user} setUser={props.setUser} />

    <FollowerList followerListShow={followerListShow} setFollowerListShow={setFollowerListShow} />

    <FollowingList followingListShow={followingListShow} setFollowingListShow={setFollowingListShow} /> 
   </>
  );
}
