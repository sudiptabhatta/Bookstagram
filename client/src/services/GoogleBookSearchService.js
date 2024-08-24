import axios from "axios";

export const GoogleBookSearchService = async (searchedBookName) => {
    const formData = new FormData();
    formData.append('bookname', searchedBookName);
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchedBookName}`);
        return response
    } catch(error) {
        throw error
    }

}