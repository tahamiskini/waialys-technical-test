import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Book {
    title: string;
    author: string;
    cover: string;
    description: string;
    releaseYear: number;
    pages: number;
    chapters: { title: string; content: string }[];
}

const BookDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) {
            axios.get(`https://api.potterdb.com/v1/books/${id}`)
                .then(response => {
                    const bookData = response.data.data.attributes;
                    setBook({
                        title: bookData.title,
                        author: bookData.author,
                        cover: bookData.cover,
                        description: bookData.summary,
                        releaseYear: new Date(bookData.release_date).getFullYear(),
                        pages: bookData.pages,
                        chapters: bookData.chapters ? bookData.chapters.map((chapter: any) => ({
                            title: chapter.title,
                            content: chapter.content,
                        })) : [],
                    });
                });
        }
    }, [id]);

    if (!book) {
        return <p>Loading...</p>;
    }

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gray-900 text-white py-8 px-4">
            <img className="w-full max-w-md" src={book.cover} alt={book.title} />
            <h1 className="text-4xl font-bold mb-4">{book.title}</h1>
            <p className="text-lg mb-2">By {book.author}</p>
            <p className="text-lg mb-2">Pages: {book.pages}</p>
            <p className="text-lg mb-2">Released: {book.releaseYear}</p>
            <p className="text-base mb-4">{book.description}</p>
            <div className="w-full max-w-md">
                {book.chapters.length > 0 ? (
                    book.chapters.map((chapter, index) => (
                        <details key={index} className="mb-2">
                            <summary className={`cursor-pointer ${!chapter.content ? 'text-gray-500' : ''}`}>
                                {chapter.title}
                            </summary>
                            {chapter.content && <p className="mt-2">{chapter.content}</p>}
                        </details>
                    ))
                ) : (
                    <p>No chapters available</p>
                )}
            </div>
        </div>
    );
};

export default BookDetails;