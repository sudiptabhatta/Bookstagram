import React from 'react'
import Book from './Book'
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

export default function Books(props) {

    return (
        <Container className='my-5'>
            <Row md={3} className="g-4">
                {props.books.map((book) => {
                    return <Col key={book.book_id}>
                        <Book book={book} setUser={props.setUser} />
                    </Col>
                })}
            </Row>
        </Container>
    )
}
