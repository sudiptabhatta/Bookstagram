import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { BookUploadService } from '../../services/BookUploadService';
import useToast from '../../hooks/useToast';


export default function BookCreate({ bookUploadShow, setBookUploadShow }) {

    const [book, setBook] = useState({ caption: '', description: '', book_image: '' });

    const{ toastSuccess, toastError } = useToast();

    const handleBookUploadClose = () => {
        setBookUploadShow(false)
        setBook({ caption: '', description: '', book_image: '' })

    }

    const handleChange = (event) => {
        if(event.target.name === "book_image"){
            setBook({ ...book, [event.target.name]: event.target.files[0] })
        }
        else{
            setBook({ ...book, [event.target.name]: event.target.value })
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await BookUploadService(book);
            toastSuccess(response.data.message);
            handleBookUploadClose();
            setBook({ caption: '', description: '', book_image: '' })
        } catch (error) {
            toastError(error.message)
        }
    }

    return (
        <Modal show={bookUploadShow} onHide={handleBookUploadClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Upload Book Photo</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="caption">
                        <Form.Label className='font-semibold'>Caption</Form.Label>
                        <Form.Control type="text" placeholder="Write a caption..." name='caption' value={book.caption} onChange={handleChange} autoFocus />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className='font-semibold'>Description</Form.Label>
                        <Form.Control as="textarea" rows={3} name='description' value={book.description} onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label className='font-semibold'>Book Browse</Form.Label>
                        <Form.Control type="file" name='book_image' onChange={handleChange} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='!bg-rose-500 !border-none' type='submit'>Post</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}