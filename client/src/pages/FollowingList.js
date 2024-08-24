import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';


export default function FollowingList({ followingListShow, setFollowingListShow, followingList }) {

    const navigate = useNavigate()

    const handleFollowingListClose = () => {
        setFollowingListShow(false)
    }

    const handleProfileView = (username) => {
        navigate(`/bookbrowse/profile/${username}`)
        setFollowingListShow(false)
    }

    return (
        <Modal show={followingListShow} onHide={handleFollowingListClose}>
            <Modal.Header closeButton>
                <Modal.Title>Following List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {followingList.count > 0 ? (<>
                        {followingList.data.map((followee, index) => {
                            return <Row key={index} className='mb-3'>
                                <Col>
                                    <div className="flex flex-row items-center gap-3">
                                        <Image className="w-16 h-16 rounded-full" src={followee.profile_picture} alt="User Profile" />
                                        <div className="flex-grow">
                                            <p className="text-lg font-semibold mb-1">{followee.username}</p>
                                            <p className="text-sm text-gray-600">{followee.fullname}</p>
                                         </div>
                                        <Button className="!bg-cyan-600 !border-none text-white" size="sm" onClick={() => handleProfileView(followee.username)}>
                                            View Profile
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        })}
                    </>
                    ) : (<>
                        <Row>
                            <Col md={3}></Col>
                            <Col><p aligan="center">No Following Users Found</p></Col>
                            <Col md={3}></Col>
                        </Row>
                    </>
                    )}
                </Container>
            </Modal.Body>
        </Modal>
    )
}

