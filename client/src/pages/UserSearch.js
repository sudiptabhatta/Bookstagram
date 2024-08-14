import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useLocation } from 'react-router';
import NavbarLayout from '../components/layout/NavbarLayout';

export default function UserSearch() {

    const { state } = useLocation();
    const { count, next, previous, results } = state.searchResult;

    return (
        <>
            <NavbarLayout />
            <Container className="mt-4">
                <Row className="justify-content-center">
                    <h4>You search for .. returned {count} result/s</h4>
                    <hr />
                    {count > 0 ? (results.map((user, index) =>
                        <Col md={6} key={index}>
                            <Card className="shadow-sm">
                                <Card.Body className="flex flex-row items-center gap-3">
                                    <Image className="w-16 h-16 rounded-full" src={user.profile_picture} alt="User Profile" />
                                    <div className="flex-grow">
                                        <p className="text-lg font-semibold mb-1">{user.fullname}</p>
                                        <p className="text-sm text-gray-600">{user.username}</p>
                                        <p className="text-sm text-gray-500">Posted 0 time/s.</p>
                                    </div>
                                    <Button className="!bg-cyan-600 !border-none text-white" size="sm">
                                        View Profile
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                        : <p>No user found</p>
                    }
                </Row>
            </Container>
        </>
    );
}
