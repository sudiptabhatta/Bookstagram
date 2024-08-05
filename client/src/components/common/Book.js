import React from 'react'
import Card from 'react-bootstrap/Card';

export default function Book(props) {
    const { book_id, caption, description, book_image, created } = props.book

    return (
        <Card style={{ height: '20rem' }}>
            <Card.Img variant="top" src={book_image} className='h-full w-full' />
        </Card>
    )
}
