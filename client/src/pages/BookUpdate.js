import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import useToast from '../hooks/useToast';
import { bookUpdateService } from '../services/BookUpdateDeleteService';
import Editor from 'react-simple-wysiwyg';

export default function BookUpdate({ bookUpdateShow, setBookUpdateShow, bookDetail, setBookDetail, setUser }) {

    const handleBookUpdateClose = () => {
        setBookUpdateShow(false);
    }

    const { toastSuccess, toastError } = useToast();

    const handleChange = (event) => {
        if (event.target.name === "book_image") {
            const target_name = "new_book_image"
            setBookDetail({ ...bookDetail, data: { ...bookDetail.data, [target_name]: event.target.files[0] } })
        }
        else {
            setBookDetail({ ...bookDetail, data: { ...bookDetail.data, [event.target.name]: event.target.value } })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await bookUpdateService(bookDetail.data, bookDetail.data.book_id);
            // console.log(response)
            // console.log(bookDetail)
            setBookDetail({...bookDetail, data: {...bookDetail.data, book_image: response.data.bookphoto.book_image}})
            setUser((prevUser) => {
                const newBooks = prevUser.books.map(book => {
                    if(book.book_id === response.data.bookphoto.book_id){
                        return {...book, ...response.data.bookphoto}
                    }
                    return book
                })
                // u have new Books
                return {...prevUser, books: newBooks}
            })
            toastSuccess(response.data.message);
            handleBookUpdateClose();
        } catch (error) {
            toastError(error.message)
        }
    }

    return (
        <Modal backdrop="static" show={bookUpdateShow} onHide={handleBookUpdateClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Book Photo</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="caption">
                        <Form.Label className='font-semibold'>Caption</Form.Label>
                        <Form.Control type="text" placeholder="Write a caption..." name='caption' value={bookDetail.data.caption} onChange={handleChange} autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className='font-semibold'>Description</Form.Label>
                        <Editor name='description' value={bookDetail.data.description} onChange={handleChange}/>
                        {/* <Form.Control as="textarea" rows={3} name='description' value={bookDetail.data.description} onChange={handleChange} /> */}
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <div className='flex flex-row gap-3'>
                            <div><Form.Label className='font-semibold'>Book Browse</Form.Label></div>
                            <div className='flex flex-row gap-2'><Image className="w-10 h-10 pb-1" src={bookDetail.data.book_image} /><span className='text-orange-400 font-semibold'>- Your Book Image</span></div>
                        </div>
                        <Form.Control type="file" name='book_image' onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="dark" type='submit'>Update</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
