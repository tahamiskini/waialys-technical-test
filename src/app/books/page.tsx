'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBooks } from '@/API/booksApi';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

interface BookAttributes {
  slug: string;
  author: string;
  cover: string;
  dedication: string;
  pages: number;
  release_date: string;
  summary: string;
  title: string;
  wiki: string;
}

interface Book {
  id: string;
  type: string;
  attributes: BookAttributes;
  relationships: {
    chapters: {
      data: Array<{ id: string; type: string }>;
    };
  };
  links: {
    self: string;
  };
}

export default function Books() {
  //states
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  //fetch books
  const fetchAllBooks = async () => {
    try {
      const booksData = await fetchBooks();
      setBooks(booksData);
    } catch (error) {
      setError('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBooks();
  }, []);

  // trim text
    const cutText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    const cutText = text.substring(0, maxLength);
    return cutText + '...';
  };
  
  //search 
  const filtredData = () =>{
    if (searchTerm) {
      return books.filter((book) =>(book.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())))
    }
    return books;  //if empty
  } 
  
  const cutDate=  (date:string) => {
    return date.substring(0,4)
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <main className="min-h-screen w-full flex  bg-background flex-col gap-5 px-16 my-12">
      <h1 className="text-2xl">Harry Potter Library 📚</h1>
      <div className="flex w-full justify-between">
        <input className='bg-transparent border rounded-lg border-gray-800 text-white placeholder-gray-500 p-2' type="search" placeholder='Search books...' 
        onChange={(e)=>{
          setSearchTerm(e.target.value)
        }}
        value={searchTerm}
        />
        <h1 className='p-2 border border-gray-800 rounded-lg '> {books.length} books</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
      {filtredData().length > 0 ? (
        filtredData().map((book,key) => (
        <Card key={key} >
        <CardHeader>
          <CardTitle>{book.attributes.title}</CardTitle>
          <CardDescription>{book.attributes.author}</CardDescription>
        </CardHeader>
        <CardContent>
          
          <img src={book.attributes.cover}  className="w-full h-full hover:scale-95 hover:rotate-3 hover:opacity-50 duration-300  ease-in-out " />
        </CardContent>
        <CardFooter>
        <div className='flex-col'>
        <p>{cutText(book.attributes.summary,200)}</p>
        
        <div className='flex flex-direction-row justify-between my-5'>
        <CardDescription>
            <h3> pages : {book.attributes.pages}</h3>
            <h3>released  : {cutDate(book.attributes.release_date)}</h3>
            </CardDescription>
            <Link href={`/books/${book.id}`}>
            <div>
                <button className='bg-white font-bold text-black px-4 py-2 rounded-md hover:bg-slate-200 duration-300 ease-in-out'>View more</button>
            </div>
            </Link>
        </div>
        </div>
          {/* 
           
          </Link> */}
        </CardFooter>
      </Card>
        ))
      ) : (
        <p>No books available</p> 
       )} 
       </div>

   
    </main>
  );
}
