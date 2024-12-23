import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import Input from '@/components/ui/input';

interface Book {
    id: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    releaseYear: number;
}

const Books = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        axios.get('https://api.potterdb.com/v1/books')
            .then(response => {
                const booksData = response.data.data.map((book: any) => ({
                    id: book.id,
                    title: book.attributes.title,
                    author: book.attributes.author,
                    cover: book.attributes.cover,
                    description: book.attributes.summary,
                    releaseYear: new Date(book.attributes.release_date).getFullYear(),
                }));
                setBooks(booksData);
                setFilteredBooks(booksData);
            });
    }, []);

    useEffect(() => {
        if (searchTerm === '') {
            setFilteredBooks(books);
        } else {
            const filtered = books.filter(book =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredBooks(filtered);
        }
    }, [searchTerm, books]);

    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-gray-900 text-white py-8 px-4">
            <h1 className="text-4xl font-bold mb-6 text-yellow-400">Harry Potter Books</h1>
            <div className="flex justify-between items-center w-full max-w-6xl mb-8">
                <Input
                    type="text"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                    placeholder="Search books..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Badge count={filteredBooks.length} />
            </div>
            {filteredBooks.length === 0 ? (
                <p className="text-xl text-red-500">No books found</p>
            ) : (
                <div className="flex flex-row flex-wrap justify-start items-start space-x-4 overflow-x-auto">
                    {filteredBooks.map((book, index) => (
                        <React.Fragment key={book.id}>
                            <Card
                                id={book.id}
                                title={book.title}
                                author={book.author}
                                cover={book.cover}
                                description={book.description}
                                releaseYear={book.releaseYear}
                            />
                            {index < filteredBooks.length - 1 && <div className="h-full w-px bg-gray-400"></div>}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Books;