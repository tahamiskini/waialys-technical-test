import axios from 'axios';
import { BASE_PATH } from '@/consts';

export interface Chapter {
  id: string;
  type: string;
  attributes: {
    title: string;
    slug: string;
    order: number;
    summary?: string; 
  };
  relationships: {
    book: {
      data: {
        id: string;
        type: string;
      };
    };
  };
}

export interface BookDetails {
  id: string;
  type: string;
  attributes: {
    title: string;
    author: string;
    cover: string;
    pages: number;
    release_date: string;
    summary: string;
  };
  chapters?: Chapter[]; 
}

export interface ApiResponse<T> {
  data: T;
}

export const fetchBookDetails = async (id: string): Promise<BookDetails | null> => {
  try {
    const bookResponse = await axios.get<ApiResponse<BookDetails>>(`${BASE_PATH}/books/${id}`);
    const bookDetails = bookResponse.data.data;

    const chaptersResponse = await axios.get<ApiResponse<Chapter[]>>(`${BASE_PATH}/books/${id}/chapters`);
    const chapters = chaptersResponse.data.data;

    return { ...bookDetails, chapters };
  } catch (error) {
    console.error('Error fetching book details:', error);
    return null;
  }
};

export const fetchChapterContent = async (bookId: string, chapterId: string): Promise<Chapter | null> => {
  try {
    const chapterResponse = await axios.get<ApiResponse<Chapter>>(`${BASE_PATH}/books/${bookId}/chapters/${chapterId}`);
    return chapterResponse.data.data;
  } catch (error) {
    console.error('Error fetching chapter content:', error);
    return null;
  }
};
