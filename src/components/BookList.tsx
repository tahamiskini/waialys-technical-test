import React from "react";
import BookCard from "./BookCard";

interface BookListProps {
  books: any[];
}

const BookList: React.FC<BookListProps> = ({ books }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {books.length > 0 ? (
      books.map((book) => <BookCard key={book.id} book={book} />)
    ) : (
      <p className="col-span-full text-center text-foreground">No books found</p>
    )}
  </div>
);

export default BookList;
