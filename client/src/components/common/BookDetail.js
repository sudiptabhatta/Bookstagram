import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { BookDetailService } from '../../services/BookDetailService';
import '../../assets/styles/customScrollbar.css';
import Moment from 'react-moment'; // 

export default function BookDetail({ bookDetailShow, setBookDetailShow, book_id }) {

    const [bookDetail, setBookDetail] = useState({ data: { user: { username: '', fullname: '', profile_picture: '' }, book_id: 0, caption: '', description: '', book_image: '', created: '' }, bookphoto_comment: [], bookphoto_rating: [] })

    // let date = new Date();

    const handleBookUploadClose = () => {
        setBookDetailShow(false)
    }

    const fetchBookDetailData = async () => {
        try {
            const response = await BookDetailService(book_id);
            setBookDetail(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchBookDetailData()
    }, [])

    return (
        <Modal show={bookDetailShow} onHide={handleBookUploadClose} scrollable={true} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>
                    Book Overview
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='customScrollbar'>
                <Card className='!border-0'>
                    <Card.Img variant="top" src={bookDetail.data.book_image} className='rounded-md' />
                    <Card.Body>
                        <Card.Title>{bookDetail.data.caption}</Card.Title>
                        <Card.Text>
                            {bookDetail.data.description}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <small className="text-muted">
                        {/* render the date in a react-like way */}
                        <Moment format="MMMM Do YYYY, h:mm:ss a">{bookDetail.data.created}</Moment>
                        </small>
                    </Card.Footer>
                </Card>
            </Modal.Body>
        </Modal>
    )
}
