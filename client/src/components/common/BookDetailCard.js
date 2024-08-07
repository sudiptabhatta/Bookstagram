import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Moment from 'react-moment';
import Image from 'react-bootstrap/Image';

export default function BookDetailCard(props) {

    const { caption, description, book_image, created } = props.bookDetail.data

    const { username, profile_picture } = props.bookDetail.data.user

    return (
        <>
            <Card className='!border-0 shadow'>
                { props.cardHeader && <Card.Header>
                <div className="flex flex-row gap-3">
                    <div><Image className="w-10 h-10" src={profile_picture} roundedCircle /></div>
                    <div><p className='text-base mt-2 font-semibold'>{username}</p></div>
                </div>
                </Card.Header> }
                <Card.Img variant="top" src={book_image} />
                <Card.Body>
                    <Card.Title>{caption}</Card.Title>
                    <Card.Text>
                        {description}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">
                        {/* render the date in a react-like way */}
                        <Moment format="MMMM Do YYYY, h:mm:ss a">{created}</Moment>
                    </small>
                </Card.Footer>
            </Card>
        </>
    )
}
