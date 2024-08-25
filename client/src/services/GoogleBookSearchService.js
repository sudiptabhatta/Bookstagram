import axios from "axios";

export const GoogleBookSearchService = async (searchedBookName) => {
    const formData = new FormData();
    formData.append('bookname', searchedBookName);
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchedBookName}&key=${process.env.REACT_APP_GOOGLE_BOOK_API_KEY}`);
        return response
    } catch(error) {
        throw error
    }

}