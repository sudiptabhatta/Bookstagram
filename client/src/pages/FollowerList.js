import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { FollowerListService } from '../services/FollowerFollowingListService';
import { useParams } from 'react-router';
import useToast from '../hooks/useToast';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


export default function FollowerList({ followerListShow, setFollowerListShow }) {

    const [followerList, setFollowerList] = useState({data: [], count: 0});

    const param = useParams();

    const { toastError } = useToast();

    const handleFollowerListClose = () => {
        setFollowerListShow(false)
    }


    const fetchFollowerList = async () => {
        try {
            const response = await FollowerListService(param.username);
            setFollowerList({...followerList, data: response.data.data, count: response.data.count})
        } catch (error) {
            toastError(error.message)
        }
    }

    useEffect(() => {
        fetchFollowerList()
    }, [])

    return (
        <Modal show={followerListShow} onHide={handleFollowerListClose}>
            <Modal.Header closeButton>
                <Modal.Title>Follower List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {followerList.data.map((follower, index) => {
                        return <Row key={index} className='mb-3'>
                            <Col>
                                <div className="flex flex-row items-center gap-3">
                                    <Image className="w-16 h-16 rounded-full" src={follower.profile_picture} alt="User Profile" />
                                    <div className="flex-grow">
                                        <p className="text-lg font-semibold mb-1">{follower.username}</p>
                                        <p className="text-sm text-gray-600">{follower.fullname}</p>
                                    </div>
                                    <Button className="!bg-cyan-600 !border-none text-white" size="sm">
                                        View Profile
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    })}
                </Container>
            </Modal.Body>
        </Modal>
    )
}
