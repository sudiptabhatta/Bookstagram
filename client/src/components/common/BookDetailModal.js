import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BookDetailService } from '../../services/BookDetailService';
import '../../assets/styles/customScrollbar.css';
import BookDetailCard from './BookDetailCard';
import Image from 'react-bootstrap/Image';
import useToast from '../../hooks/useToast';
import Comment from './Comment';
import Dropdown from 'react-bootstrap/Dropdown';
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import BookUpdate from '../../pages/BookUpdate';

export default function BookDetailModal({ bookDetailShow, setBookDetailShow, book_id }) {

    const [bookDetail, setBookDetail] = useState({ data: { user: { username: '', fullname: '', profile_picture: '' }, book_id: 0, caption: '', description: '', book_image: '', new_book_image: null, created: '' }, bookphoto_comment: [], bookphoto_rating: [] });

    const [bookUpdateShow, setBookUpdateShow] = useState(false);

    const { toastError } = useToast();

    const handleBookUploadClose = () => {
        setBookDetailShow(false);
    }

    const handleBookUpdateShow = () => {
        setBookUpdateShow(true);
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
        <>
            <Modal show={bookDetailShow} onHide={handleBookUploadClose} scrollable={true} backdrop="static">
                <Modal.Header closeButton className='pb-2'>
                    <Modal.Title className='mt-2'>
                        <div className="flex flex-row gap-3">
                            <div><Image className="w-10 h-10" src={bookDetail.data.user.profile_picture} roundedCircle /></div>
                            <div><p className='text-base mt-2'>{bookDetail.data.user.username}</p></div>
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle variant="dark" id="dropdown-basic" size='sm' className='ml-64'></Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={handleBookUpdateShow}>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <div> <MdEdit /></div>
                                                <div>Edit</div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <div><MdDelete /></div>
                                                <div>Delete</div>
                                            </div>
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='customScrollbar'>
                    <BookDetailCard bookDetail={bookDetail} />
                    <br />
                    <Comment book_id={bookDetail.data.book_id} comment_data={bookDetail.bookphoto_comment} />
                </Modal.Body>
            </Modal>

            <BookUpdate bookUpdateShow={bookUpdateShow} setBookUpdateShow={setBookUpdateShow} bookDetail={bookDetail} setBookDetail={setBookDetail} />
        </>
    )
}
