import React, { useEffect, useState } from 'react'
import { Rating } from '@smastrom/react-rating'
import { BookRatingService } from '../../services/BookRatingService';
import useToast from '../../hooks/useToast';

export default function BookRating({ bookDetail, setBookDetail }) {

    const { book_id } = bookDetail.data

    const { rating } = bookDetail.bookphoto_rating

    const [bookRating, setBookRating] = useState(rating);

    const { toastError } = useToast();

    useEffect(() => {
        setBookRating(rating)
    }, [rating])

    const handleRatingChange = async (selectedValue) => {

        try {
            const response = await BookRatingService(book_id, selectedValue);
            setBookRating(response.data.bookphoto_rating.rating);
            setBookDetail({...bookDetail, bookphoto_rating: {...bookDetail.bookphoto_rating, rating: response.data.bookphoto_rating.rating}})
        } catch(error) {
            toastError(error.message)
        }
        
    }

    return (
        <div>
            <Rating style={{ maxWidth: 150 }} value={bookRating} onChange={handleRatingChange} />
        </div>
    )
}
