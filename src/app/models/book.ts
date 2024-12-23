import axios from "axios";
import { BASE_PATH } from '@/consts'

export interface Book {
    id: string;
    type: string;
    attributes: {
        title: string;
        author: string;
        cover: string;
        summary: string;
        release_date: string;
        pages: number;
    };
}

export interface ApiResponse {
    data: Book[];
}

export const fetchBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get<ApiResponse>(`${BASE_PATH}/books`);
        return response.data.data;
    } catch (error){
        console.error('Error fetching books:', error);
        return [];
    }
};