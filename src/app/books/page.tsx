"use client"
import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';
import { Badge } from "@/components/ui/badge"
import SkeletonC from '@/components/SkeletonC';
import BookCard from '@/components/BookCard';
import SearchBar from '@/components/SearchBar';



const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(() => {
    const getBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
        setLoading(false);
        
      } catch (error) {
        setError( error.message );
       
        setBooks([]);
        
        
      }
    };
    
    getBooks();
    
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) 
);
  if (loading) return  <SkeletonC/>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className='m-5'>
      <header>
        <h1 className="text-2xl font-bold">Harry Potter Books </h1>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
      </header>
      <Badge variant="outline" className='text-xl'>  {filteredBooks.length} books found</Badge>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.length > 0 ? (
          filteredBooks.map((book ) => (
            <BookCard key={book.slug} book={book}  />
          ))
        ) : (
          <p>No books found</p>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
