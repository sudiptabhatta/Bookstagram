import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BookDetailService } from '../../services/BookDetailService';
import '../../assets/styles/customScrollbar.css';
import BookDetailCard from './BookDetailCard';
import Image from 'react-bootstrap/Image';
import useToast from '../../hooks/useToast';

export default function BookDetailModal({ bookDetailShow, setBookDetailShow, book_id }) {

    const [bookDetail, setBookDetail] = useState({ data: { user: { username: '', fullname: '', profile_picture: '' }, book_id: 0, caption: '', description: '', book_image: '', created: '' }, bookphoto_comment: [], bookphoto_rating: [] })

    const { toastError } = useToast();

    const handleBookUploadClose = () => {
        setBookDetailShow(false)
    }

    const fetchBookDetailData = async () => {
        try {
            const response = await BookDetailService(book_id);
            setBookDetail(response.data)
        } catch (error) {
            toastError(error.message)
        }
    }

    useEffect(() => {
        fetchBookDetailData()
    }, [])

    return (
        <Modal show={bookDetailShow} onHide={handleBookUploadClose} scrollable={true} backdrop="static">
            <Modal.Header closeButton className='pb-2'>
                <Modal.Title>
                    <div className="flex flex-row gap-3">
                        <div><Image className="w-10 h-10" src={bookDetail.data.user.profile_picture} roundedCircle /></div>
                        <div><p className='text-base mt-2'>{bookDetail.data.user.username}</p></div>
                    </div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='customScrollbar'>
                <BookDetailCard bookDetail={bookDetail} />
            </Modal.Body>
        </Modal>
    )
}
