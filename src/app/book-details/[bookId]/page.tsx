"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import BookImage from "@/components/BookImage";
import BookDetails from "@/components/BookDetails";
import BookChapters from "@/components/BookChapters";

export const BASE_PATH = "https://api.potterdb.com/v1";

const BookDetailsPage: React.FC = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openChapter, setOpenChapter] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookResponse = await axios.get(`${BASE_PATH}/books/${bookId}`);
        const bookData = bookResponse.data.data;
        setBook(bookData);

        try {
          const chaptersResponse = await axios.get(
            `${BASE_PATH}/books/${bookId}/chapters`
          );
          setChapters(chaptersResponse.data.data || []);
        } catch (err) {
          console.warn("No chapters found for this book.");
          setChapters([]);
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <p>Book not found.</p>;

  const { attributes } = book;

  return (
    <div className="p-6 px-32 text-white min-h-screen">
      <div className="flex flex-col md:flex-row gap-6">
        <BookImage cover={attributes.cover} title={attributes.title} />
        <div className="flex-1">
          <BookDetails
            title={attributes.title}
            author={attributes.author}
            pages={attributes.pages}
            releaseDate={attributes.release_date}
            summary={attributes.summary}
          />
          <BookChapters
            chapters={chapters}
            openChapter={openChapter}
            setOpenChapter={setOpenChapter}
          />
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
