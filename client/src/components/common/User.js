import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ProfilePictureUpdateDelete from '../../pages/ProfilePictureUpdateDelete';
import FollowerList from '../../pages/FollowerList';
import FollowingList from '../../pages/FollowingList';
import useToast from '../../hooks/useToast';
import { UserFollowService, UserUnfollowService } from '../../services/UserFollowUnfollowService';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { FollowerListService, FollowingListService } from '../../services/FollowerFollowingListService';

export default function User(props) {

  const { email, username, fullname, profile_picture, book_count } = props.user

  const [follow, setFollow] = useState(false);

  const [show, setShow] = useState(false);

  const [followerListShow, setFollowerListShow] = useState(false);
  const [followingListShow, setFollowingListShow] = useState(false);

  const [followerList, setFollowerList] = useState({ data: [], count: 0 });
  const [followingList, setFollowingList] = useState({ data: [], count: 0 });

  const { toastError } = useToast();

  let [loggedinUsername, setLoggedinUsername] = useState("");

  const handleProPicUpdateDeleteModalShow = () => {
    setShow(true)
  }

  const handleFollowerListClick = () => {
    setFollowerListShow(true)
  }

  const handleFollowingListClick = () => {
    setFollowingListShow(true)
  }

  const handleFollowClick = async () => {
    try {
      const response = await UserFollowService(loggedinUsername, username);
      setFollowerList((prevFollowerList) => {
        return {...prevFollowerList, data: [...prevFollowerList.data, response.data.data], count: prevFollowerList.count + 1}
      })
      setFollow(true)
    } catch (error) {
      toastError(error.message)
    }
  }

  const handleUnfollowClick = async () => {
    try {
      const response = await UserUnfollowService(loggedinUsername, username);
      console.log(followerList)
      setFollowerList((prevFollowerList) => {
        const  filteredFollowerList = prevFollowerList.data.filter((follower) => follower.username !== loggedinUsername)
        return {...prevFollowerList, data: filteredFollowerList, count: prevFollowerList.count - 1}
      })
      setFollow(false)
    } catch (error) {
      toastError(error.message)
    }
  }

  const fetchFollowerList = async () => {
    try {
      const response = await FollowerListService(username);
      const data = response.data.data
      for (let i = 0; i < data.length; i++) {
        if (data[i].username === loggedinUsername) {
          setFollow(true)
        }
      }
      setFollowerList({ ...followerList, data: data, count: response.data.count })
    } catch (error) {
      toastError(error.message)
    }
  }

  const fetchFollowingList = async () => {
    try {
      const response = await FollowingListService(username);
      setFollowingList({ ...followingList, data: response.data.data, count: response.data.count })
    } catch (error) {
      toastError(error.message)
    }
  }

  const setCurrentUser = () => {
    const accessToken = Cookies.get('accessToken')
    const decoded = jwtDecode(accessToken)
    setLoggedinUsername(decoded.username)
  }

  useEffect(() => {
    setCurrentUser()
  }, [])

  useEffect(() => {
    if(username === ""){
      return
    }
    setCurrentUser()
    fetchFollowerList()
    fetchFollowingList()
  }, [username])

  useEffect(() => {
    console.log(followerList)
  }, [followerList])

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
                <Card.Text onClick={handleFollowerListClick} className='cursor-pointer'><b>{followerList.count}</b> Followers</Card.Text>
                <Card.Text className='cursor-pointer' onClick={handleFollowingListClick}><b>{followingList.count}</b> Following</Card.Text>
              </div>
              <Card.Title>{fullname}</Card.Title>
              <Card.Text>{email}</Card.Text>
              {loggedinUsername !== username &&
                (follow ? <Button className="w-40 !bg-gray-950 !border-none !shadow-sm !shadow-gray-800 !rounded-full mb-3" size="sm" onClick={handleUnfollowClick}>Unfollow</Button>
                  : <Button className="w-40 !bg-gray-950 !border-none !shadow-sm !shadow-gray-800 !rounded-full mb-3" size="sm" onClick={handleFollowClick}>Follow</Button>)
              }
            </div>
          </Card.Body>
        </Card>
      </Container>

      <ProfilePictureUpdateDelete show={show} setShow={setShow} user={props.user} setUser={props.setUser} />

      <FollowerList followerListShow={followerListShow} setFollowerListShow={setFollowerListShow} followerList={followerList} />

      <FollowingList followingListShow={followingListShow} setFollowingListShow={setFollowingListShow} followingList={followingList} />
    </>
  );
}
