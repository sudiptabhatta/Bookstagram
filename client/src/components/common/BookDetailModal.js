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
import BookDelete from '../../pages/BookDelete';
import BookUpdate from '../../pages/BookUpdate';
import { useNavigate } from 'react-router';
import { RiPagesLine } from "react-icons/ri";

export default function BookDetailModal({ bookDetailShow, setBookDetailShow, book_id, setUser }) {

    const [bookDetail, setBookDetail] = useState({ data: { user: { username: '', fullname: '', profile_picture: '' }, book_id: 0, caption: '', description: '', book_image: '', new_book_image: null, created: '' }, bookphoto_comment: [], bookphoto_rating: [] });

    const [bookUpdateShow, setBookUpdateShow] = useState(false);
    const [bookDeleteShow, setBookDeleteShow] = useState(false);

    const navigate = useNavigate();

    const { toastError } = useToast();

    const handleBookUploadClose = () => {
        setBookDetailShow(false);
    }

    const handleBookUpdateShow = () => {
        setBookUpdateShow(true);
    }

    const handleBookDeleteShow = () => {
        setBookDeleteShow(true);
    }

    const handleBookPageVisit = (book_id) => {
        navigate(`/bookbrowse/b/${book_id}`)
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
                        <div className="flex flex-row">
                            <div><Image className="w-10 h-10 mr-6" src={bookDetail.data.user.profile_picture} roundedCircle /></div>
                            <div><p className='text-base mt-2'>{bookDetail.data.user.username}</p></div>
                            <div>
                                <Dropdown>
                                    <Dropdown.Toggle className='ml-64' variant="dark" id="dropdown-basic" size='sm'></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => handleBookPageVisit(bookDetail.data.book_id)}>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <div> <RiPagesLine /></div>
                                                <div>Go to Page</div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item onClick={handleBookUpdateShow}>
                                            <div className='flex flex-row gap-2 items-center'>
                                                <div> <MdEdit /></div>
                                                <div>Edit</div>
                                            </div>
                                        </Dropdown.Item>
                                        <Dropdown.Item>
                                            <div className='flex flex-row gap-2 items-center' onClick={handleBookDeleteShow}>
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

            <BookUpdate bookUpdateShow={bookUpdateShow} setBookUpdateShow={setBookUpdateShow} bookDetail={bookDetail} setBookDetail={setBookDetail} setUser={setUser} />
            <BookDelete book_id={book_id} setUser={setUser} bookDeleteShow={bookDeleteShow} setBookDeleteShow={setBookDeleteShow} />
        </>
    )
}
