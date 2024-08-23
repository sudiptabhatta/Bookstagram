import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import { FollowerListService, FollowingListService } from '../services/FollowerFollowingListService';
import { useParams } from 'react-router';
import useToast from '../hooks/useToast';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


export default function FollowingList({ followingListShow, setFollowingListShow }) {

    const [followingList, setFollowingList] = useState({data: [], count: 0});

    const param = useParams();

    const { toastError } = useToast();

    const handleFollowingListClose = () => {
        setFollowingListShow(false)
    }


    const fetchFollowingList = async () => {
        try {
            const response = await FollowingListService(param.username);
            setFollowingList({...followingList, data: response.data.data, count: response.data.count})
        } catch (error) {
            toastError(error.message)
        }
    }

    useEffect(() => {
        fetchFollowingList()
    }, [])

    return (
        <Modal show={followingListShow} onHide={handleFollowingListClose}>
            <Modal.Header closeButton>
                <Modal.Title>Following List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    {followingList.data.map((followee, index) => {
                        return <Row key={index} className='mb-3'>
                            <Col>
                                <div className="flex flex-row items-center gap-3">
                                    <Image className="w-16 h-16 rounded-full" src={followee.profile_picture} alt="User Profile" />
                                    <div className="flex-grow">
                                        <p className="text-lg font-semibold mb-1">{followee.username}</p>
                                        <p className="text-sm text-gray-600">{followee.fullname}</p>
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

