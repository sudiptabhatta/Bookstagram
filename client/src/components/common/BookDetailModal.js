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
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import { Button } from 'react-bootstrap';
import { GoTab } from "react-icons/go";

export default function BookDetailModal({ bookDetailShow, setBookDetailShow, book_id, setUser }) {

    const [bookDetail, setBookDetail] = useState({ data: { user: { username: '', fullname: '', profile_picture: '' }, book_id: 0, caption: '', description: '', book_image: '', new_book_image: null, created: '' }, bookphoto_comment: [], bookphoto_rating: { rating: null } });

    const [bookUpdateShow, setBookUpdateShow] = useState(false);
    const [bookDeleteShow, setBookDeleteShow] = useState(false);

    const [loggedinUsername, setLoggedinUsername] = useState('');

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
        const accessToken = Cookies.get('accessToken');
        const decoded = jwtDecode(accessToken)
        setLoggedinUsername(decoded.username)
        fetchBookDetailData()
    }, [])

    return (
        <>
            <Modal show={bookDetailShow} onHide={handleBookUploadClose} scrollable={true} backdrop="static" size='lg'>
                <Modal.Header closeButton className='pb-2'>
                    <Modal.Title className='mt-2 container'>
                        <div className="row">
                            <div className='col-1'><Image className="w-10 h-10" src={bookDetail.data.user.profile_picture} roundedCircle /></div>
                            <div className='col-10'><p className='text-base mt-2'>{bookDetail.data.user.username}</p></div>
                            <div className='col-1'>
                                {bookDetail.data.user.username === loggedinUsername ? (
                                    <>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="light" id="dropdown-basic" size='sm'></Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item onClick={() => handleBookPageVisit(bookDetail.data.book_id)}>
                                                    <div className='flex flex-row gap-2 items-center'>
                                                        <div><GoTab /></div>
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
                                    </>
                                ) : (
                                    <>
                                        <Button variant='light' onClick={() => handleBookPageVisit(bookDetail.data.book_id)}><GoTab /></Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className='customScrollbar'>
                    <BookDetailCard bookDetail={bookDetail} setBookDetail={setBookDetail} />
                    <br />
                    {/* <Comment book_id={bookDetail.data.book_id} comment_data={bookDetail.bookphoto_comment} /> */}
                    <Comment bookDetail={bookDetail} setBookDetail={setBookDetail} />
                </Modal.Body>
            </Modal>

            <BookUpdate bookUpdateShow={bookUpdateShow} setBookUpdateShow={setBookUpdateShow} bookDetail={bookDetail} setBookDetail={setBookDetail} setUser={setUser} />
            <BookDelete book_id={book_id} setUser={setUser} bookDeleteShow={bookDeleteShow} setBookDeleteShow={setBookDeleteShow} />
        </>
    )
}
