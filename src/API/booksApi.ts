import { BASE_PATH } from '@/consts';
import axios from 'axios';


export const fetchBooks = async () => {
    try {
      const response = await axios.get(BASE_PATH + "/books/");
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };
export const fetchBookId = async (id:string) => {
    try {
      const response = await axios.get(BASE_PATH + "/books/"+id);
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };
export const fetchChapterByChapterId = async ({id, book_id}:{id:string,book_id:string}) => {
    try {
      const response = await axios.get(BASE_PATH + "/books/" +book_id + "/chapters/"+id);
      console.log("Fetched books:", response.data.data);  
      return response.data.data; 
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  };
  

  
  
  