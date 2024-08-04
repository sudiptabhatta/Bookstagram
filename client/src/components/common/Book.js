import React from 'react'
import Card from 'react-bootstrap/Card';

export default function Book(props) {
    const { book_id, caption, description, book_image, created } = props.book

    return (

        <Card>
            <Card.Img variant="top" src={book_image} />
            <Card.Body>
                <Card.Title>{caption}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
