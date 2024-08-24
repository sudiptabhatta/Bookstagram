import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';


export default function FollowerList({ followerListShow, setFollowerListShow, followerList }) {

    const navigate = useNavigate();

    const handleFollowerListClose = () => {
        setFollowerListShow(false)
    }

    const handleProfileView = (username) => {
        navigate(`/bookbrowse/profile/${username}`)
        setFollowerListShow(false)
    }

    return (
        <Modal show={followerListShow} onHide={handleFollowerListClose}>
            <Modal.Header closeButton>
                <Modal.Title>Follower List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {followerList.count > 0 ? (
                        <>{followerList.data.map((follower, index) => {
                            return <Row key={index} className='mb-3'>
                                <Col>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image className="w-16 h-16 rounded-full" src={follower.profile_picture} alt="User Profile" />
                                        <div className="flex-grow">
                                            <p className="text-lg font-semibold mb-1">{follower.username}</p>
                                            <p className="text-sm text-gray-600">{follower.fullname}</p>
                                        </div>
                                        <Button className="!bg-cyan-600 !border-none text-white" size="sm" onClick={() => handleProfileView(follower.username)}>
                                            View Profile
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        })}</>
                    ) : (
                        <><Row>
                            <Col md={3}></Col>
                            <Col><p aligan="center">No Followers Found</p></Col>
                            <Col md={3}></Col>
                        </Row></>
                    )}
                </Container>
            </Modal.Body>
        </Modal>
    )
}
