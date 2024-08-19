import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { BookDetailService } from '../services/BookDetailService';
import useToast from '../hooks/useToast';
import BookDetailCard from '../components/common/BookDetailCard'
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import NavbarLayout from '../components/layout/NavbarLayout';
import Comment from '../components/common/Comment';

export default function BookDetailPage() {

    const params = useParams();

    const [bookDetail, setBookDetail] = useState({ data: { user: { username: '', fullname: '', profile_picture: '' }, book_id: 0, caption: '', description: '', book_image: '', created: '' }, bookphoto_comment: [], bookphoto_rating: {rating: null} })

    const { toastError } = useToast();

    const [cardHeader, setCardHeader] = useState(true);

    const fetchBookDetailData = async () => {
        try {
            const response = await BookDetailService(params.book_id);
            setBookDetail(response.data)
        } catch (error) {
            toastError(error.message)
        }
    }

    useEffect(() => {
        fetchBookDetailData()
    }, [])


    return (
        <>
            <NavbarLayout />
            <Container className='my-10'>
                <Row>
                    <Col md={3}></Col>
                    <Col md={6}>
                        <BookDetailCard bookDetail={bookDetail} cardHeader={cardHeader} />
                        <br />
                        <Comment book_id={bookDetail.data.book_id} comment_data={bookDetail.bookphoto_comment} />
                    </Col>
                    <Col md={3}></Col>
                </Row>
            </Container>
        </>
    )
}
