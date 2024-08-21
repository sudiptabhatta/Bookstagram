import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BookUploadService } from '../../services/BookUploadService';
import useToast from '../../hooks/useToast';
import Editor from 'react-simple-wysiwyg';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaSearch } from "react-icons/fa";
import { GoogleBookSearchService } from '../../services/GoogleBookSearchService';
import Table from 'react-bootstrap/Table';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function BookCreate({ bookUploadShow, setBookUploadShow, user, setUser }) {

    const [book, setBook] = useState({ caption: '', description: '', book_image: '' });

    const [searchedBookName, setSearchedBookName] = useState('');
    const [searchedBookItems, setSearchBookItems] = useState(null);

    const { toastSuccess, toastError } = useToast();

    const handleBookUploadClose = () => {
        setBookUploadShow(false)
        setBook({ caption: '', description: '', book_image: '' })

    }

    const handleChange = (event) => {
        if (event.target.name === "book_image") {
            setBook({ ...book, [event.target.name]: event.target.files[0] })
        }
        else {
            setBook({ ...book, [event.target.name]: event.target.value })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await BookUploadService(book);
            toastSuccess(response.data.message);
            // console.log(book)
            // console.log(user.books)
            // console.log(response.data.bookphoto)
            // setUser(prevUser => ({
            //     ...prevUser,
            //     books: [response.data.bookphoto, ...prevUser.books],
            //     book_count: prevUser.book_count + 1 // Increment the book count
            // }));
            setUser({ ...user, books: [response.data.bookphoto, ...user.books], book_count: user.book_count + 1 })
            handleBookUploadClose();
            setBook({ caption: '', description: '', book_image: '' })
        } catch (error) {
            toastError(error.message)
        }
    }

    const handleBookSearchChange = (event) => {
        setSearchedBookName(event.target.value);
    }

    const handleBookSearchKeyDown = async (event) => {
        if (event.key === 'Enter') {
            // call google books api
            try {
                const response = await GoogleBookSearchService(searchedBookName);
                let bookItems = [];
                if (response.data.totalItems === 0) {
                    toastError("Search did not return any books.")
                    return;
                }
                response.data.items.slice(0, Math.min(3, response.data.totalItems)).map((item) => {
                    let book = {
                        bookTitle: item.volumeInfo.title,
                        author: item.volumeInfo.authors[0],
                        publishedDate: item.volumeInfo.publishedDate,
                        previewLink: item.volumeInfo.previewLink
                    }
                    bookItems.push(book)
                })
                setSearchBookItems(bookItems)
            } catch (error) {
                toastError(error)
            }
        }
    }

    const handleSuggestedGbookClick = (index) => {
        const selectedBook = searchedBookItems[index];
        let bookAdd = `<p><a href=${selectedBook.previewLink}>${selectedBook.bookTitle} -- ${selectedBook.author} -- ${selectedBook.publishedDate}</a></p>`
        setBook({ ...book, description: bookAdd })
    }


    return (
        <Modal show={bookUploadShow} onHide={handleBookUploadClose} backdrop="static" size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Upload Book Photo</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="caption">
                        <Form.Label className='font-semibold'>Caption</Form.Label>
                        <Form.Control type="text" placeholder="Write a caption..." name='caption' value={book.caption} onChange={handleChange} autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="search">
                        <Form.Label className='font-semibold'>Enter Book Name</Form.Label>
                        <InputGroup>
                            <Form.Control type="search" placeholder="Search for a book..." name='bookname' value={searchedBookName} onChange={handleBookSearchChange} onKeyDown={handleBookSearchKeyDown} />
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    {searchedBookItems && (<>
                        <Row>
                            <Col md={2}></Col>
                            <Col md={8}>


                                <h6 className='text-center font-bold'>Suggested from Google Books</h6>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Book Title</th>
                                            <th>First Author</th>
                                            <th>Published Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>a
                                        {searchedBookItems.map((item, index) => {
                                            return (<tr key={index} onClick={() => handleSuggestedGbookClick(index)}>
                                                <td>{index + 1}</td>
                                                <td>{item.bookTitle}</td>
                                                <td>{item.author}</td>
                                                <td>{item.publishedDate}</td>
                                            </tr>)
                                        })}
                                    </tbody>
                                </Table>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                    </>)}
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className='font-semibold'>Description</Form.Label>
                        <Editor name='description' value={book.description} onChange={handleChange} />
                        {/* <Form.Control as="textarea" rows={3} name='description' value={book.description} onChange={handleChange} /> */}
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='font-semibold'>Book Browse</Form.Label>
                        <Form.Control type="file" name='book_image' onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" onClick={handleSubmit}>Post</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}