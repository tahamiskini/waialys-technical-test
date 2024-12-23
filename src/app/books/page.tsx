'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Book, fetchBooks } from '../models/book';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Books() {
    const router = useRouter();
    const [books, setBooks] = useState<Book[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

    useEffect(() => {
        const getBooks = async () => {
            const fetchedBooks = await fetchBooks();
            setBooks(fetchedBooks);
            setFilteredBooks(fetchedBooks);
        };
        getBooks();
    }, []);

    useEffect(() => {
        const filtered = books.filter(book =>
            book.attributes.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchQuery, books]);

    const handleViewMore = (bookId: string) => {
        router.push(`/books/${bookId}`);
    };

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <div className="max-w-[1200px] mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-mono">Harry Potter Books</h1>
                    <Badge variant="outline" className="bg-transparent text-white">
                        {filteredBooks.length} books
                    </Badge>
                </div>

                <Input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-full mb-8 bg-transparent border-gray-700 text-white"
                />

                {filteredBooks.length === 0 ? (
                    <p className="text-gray-400">No books found.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBooks.map((book) => (
                            <Card key={book.id} className="bg-[#111] border-gray-800 overflow-hidden">
                                <CardContent className="p-0">
                                    <img
                                        src={book.attributes.cover}
                                        alt={book.attributes.title}
                                        className="w-full h-[400px] object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-xl font-semibold mb-2">
                                            {book.attributes.title}
                                        </h2>
                                        <p className="text-gray-400 text-sm mb-2">
                                            {book.attributes.author}
                                        </p>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                            {book.attributes.summary}
                                        </p>
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-gray-400 text-sm">
                                                Pages: {book.attributes.pages}
                                            </p>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <p className="text-gray-400 text-sm">
                                                Released: {new Date(book.attributes.release_date).getFullYear()}
                                            </p>
                                            <Link href={`/books/${book.id}`}>
                                                <Button 
                                                    variant="outline"
                                                    className="text-sm text-white bg-transparent border border-gray-700 px-3 py-1 rounded hover:bg-gray-800 transition-colors"
                                                >
                                                    View More
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}