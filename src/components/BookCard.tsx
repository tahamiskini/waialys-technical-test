import React from "react";
import Link from "next/link";

interface BookCardProps {
  book: any;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => (
  <div className="border border-white/20 rounded-lg p-4 flex flex-col">
    <h3 className="text-lg font-semibold mb-2 text-foreground">
      {book.attributes.title}
    </h3>
    <p className="text-sm text-muted-foreground mb-4">
      {book.attributes.author}
    </p>
    <Link href={`/book-details/${book.id}`}>
      <img
        src={book.attributes.cover}
        alt={book.attributes.title}
        className="w-full max-h-[500px] object-cover rounded-md mb-4 transition-transform transform hover:scale-105 hover:rotate-1 hover:grayscale"
      />
    </Link>
    <p className="text-sm line-clamp-3 text-foreground">
      {book.attributes.summary}
    </p>
    <div className="flex justify-between items-center mt-4">
      <div className="flex flex-col">
        <p className="text-xs text-muted-foreground">
          Pages: {book.attributes.pages}
        </p>
        <p className="text-xs text-muted-foreground">
          Released:{" "}
          {new Date(book.attributes.release_date).getFullYear()}
        </p>
      </div>
      <Link href={`/book-details/${book.id}`}>
        <button className="px-4 py-1 bg-white hover:bg-gray-100 text-black rounded-md text-sm">
          View More
        </button>
      </Link>
    </div>
  </div>
);

export default BookCard;
