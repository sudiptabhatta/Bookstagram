import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';
import { CommentService } from '../../services/CommentService';
import useToast from '../../hooks/useToast';

export default function Comment(props) {

    const [ comment, setComment ] = useState({comment_user: { id: 0, username: '' }, comment_data: { comment_id: 0, comment: '', created: '' }});

    const { book_id } = props

    const { toastError } = useToast();

    const handleCommentChange = (event) => {
        setComment({...comment, comment_data: {...comment.comment_data, [event.target.name]: event.target.value}});
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await CommentService(comment, book_id);
            console.log(response)
            setComment({comment_user: { id: 0, username: '' }, comment_data: { comment_id: 0, comment: '', created: '' }})
        } catch(error) {
            toastError(error.message)
        }
    };

    return (
        <Card className="!border-0 shadow-sm">
            <Card.Body>
                <Form onSubmit={handleCommentSubmit}>
                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Control as="textarea" rows={3} name="comment" placeholder="Write a comment...." value={comment.comment_data.comment} onChange={handleCommentChange} />
                    </Form.Group>
                    <Button className="!bg-rose-500 !border-none" type="submit">Post</Button>
                </Form>
                <br />
            </Card.Body>
        </Card>
    );
}
