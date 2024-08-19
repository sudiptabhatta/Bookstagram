import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import BookDetailModal from './BookDetailModal';

export default function Book(props) {
    const { book_id, book_image } = props.book

    const [bookDetailShow, setBookDetailShow] = useState(false);

    const handleBookDetailShow = () => {
        setBookDetailShow(true);
    }

    return (
        <>
            <Card style={{ height: '22rem', width: '22rem' }} onClick={handleBookDetailShow}>
                <Card.Img variant="top" src={book_image} className='h-full w-full' />
            </Card>

            <BookDetailModal book_id={book_id} bookDetailShow={bookDetailShow} setBookDetailShow={setBookDetailShow} setUser={props.setUser} />
        </>
    )
}
