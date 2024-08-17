import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useLocation, useNavigate } from 'react-router';
import NavbarLayout from '../components/layout/NavbarLayout';
import { useSearchParams } from 'react-router-dom';

export default function UserSearch() {

    const { state } = useLocation();
    const { count, results } = state.searchResult;

    const navigate = useNavigate();

    const [searchParam, setSearchParam] = useSearchParams();

    const handleProfileView = (username) => {
        navigate(`/bookbrowse/profile/${username}`)
    }

    return (
        <>
            <NavbarLayout />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <Col md={3}></Col>
                    <Col>
                        <h4 className='text-center text-lg'>You search for <i className=''>{searchParam.get('search')}</i> returned {count} result/s</h4>
                        <hr />
                    </Col>
                    <Col md={3}></Col>
                </Row>
                {count > 0 ? (
                    results.map((user, index) => (
                        <Row key={index}>
                            <Col md={3}></Col>
                            <Col md={6} className="mb-3"> 
                                <Card className="shadow-sm">
                                    <Card.Body className="flex flex-row items-center gap-3">
                                        <Image className="w-16 h-16 rounded-full" src={user.profile_picture} alt="User Profile" />
                                        <div className="flex-grow">
                                            <p className="text-lg font-semibold mb-1">{user.fullname}</p>
                                            <p className="text-sm text-gray-600">{user.username}</p>
                                            <p className="text-sm text-gray-500">Posted 0 time/s.</p>
                                        </div>
                                        <Button className="!bg-cyan-600 !border-none text-white" size="sm" onClick={() => handleProfileView(user.username)}>
                                            View Profile
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>

                            <Col md={3}></Col>
                        </Row>
                    ))
                ) : (
                    <Row>
                        <Col md={3}></Col>
                        <Col><p align="center">No user found</p></Col>
                        <Col md={3}></Col>
                    </Row>

                )}
            </Container>

        </>
    );
}
