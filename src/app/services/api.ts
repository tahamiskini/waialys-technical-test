import { BASE_PATH } from '@/consts';
import axios from 'axios';



export const fetchBooks = async () => {
  try {
    const response = await axios(`${BASE_PATH}`);
    return response.data.data.map((book: any) =>({
      id: book.id,
      ...book.attributes
  }))
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};






