import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { bookDeleteService } from '../services/BookUpdateDeleteService';
import useToast from '../hooks/useToast';

export default function BookDelete({ bookDeleteShow, setBookDeleteShow, book_id, setUser }) {

    const handleDeleteClose = () => {
        setBookDeleteShow(false);
    }

    const { toastError } = useToast();

    const handleDeletePhoto = async () => {
        try {
            const response = await bookDeleteService(book_id)
            setUser((prevUser) => {
                const  filteredBookList = prevUser.books.filter((book) => book.book_id !== book_id)
                return {...prevUser, books: filteredBookList, book_count: prevUser.book_count - 1}
            })
            handleDeleteClose();
        } catch(error) {
           toastError(error)
        }
    }

    return (
        <Modal show={bookDeleteShow} onHide={handleDeleteClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Book Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this book photo?</Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleDeletePhoto}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
