import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { CommentService } from '../../services/CommentService';
import useToast from '../../hooks/useToast';
import Moment from 'react-moment';
import Image from 'react-bootstrap/Image';

export default function Comment(props) {

    const [bookComment, setBookComment] = useState({ comment_user: { id: 0, username: '' }, comment_data: { comment_id: 0, comment: '', created: '' } });

    const { book_id } = props

    const { toastError } = useToast();

    const handleCommentChange = (event) => {
        setBookComment({ ...bookComment, comment_data: { ...bookComment.comment_data, [event.target.name]: event.target.value } });
    };

    const handleCommentSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await CommentService(bookComment, book_id);
            setBookComment({ comment_user: { id: 0, username: '' }, comment_data: { comment_id: 0, comment: '', created: '' } })
        } catch (error) {
           toastError(error.message)
        }
    };

    return (
        <Card className="!border-0 shadow-sm">
            <Card.Body>
                <Form onSubmit={handleCommentSubmit}>
                    <Form.Group className="mb-3" controlId="comment">
                        <Form.Control as="textarea" rows={3} name="comment" placeholder="Write a comment...." value={bookComment.comment_data.comment} onChange={handleCommentChange} />
                    </Form.Group>
                    <Button className="!bg-rose-500 !border-none" type="submit">Post</Button>
                </Form>
                <br />
                {props.comment_data.map((cc) => {
                    return <div key={cc.comment_id}>
                        <Card className='!bg-slate-50 border-0'>
                            <Card.Body>
                                <div className="flex flex-row gap-3">
                                    <div><Image className="w-10 h-10" src={cc.comment_user.profile_picture} roundedCircle /></div>
                                    <div><p className='text-base mt-2 font-semibold'>{cc.comment_user.username}</p></div>
                                </div>
                                <Card.Text className='pl-14'>{cc.comment}</Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    <Moment format="MMMM Do YYYY, h:mm:ss a">{cc.created}</Moment>
                                </small>
                            </Card.Footer>
                        </Card>
                        <br />
                    </div>
                })}
            </Card.Body>
        </Card>
    );
}
