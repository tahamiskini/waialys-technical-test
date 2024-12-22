"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link";
interface BookCardProps {
  book: {
    id: string;
    slug: string;
    cover: string;
    title: string;
    author: string;
    summary: string;
    release_date: string;
  };
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="card p-4 border rounded shadow flex flex-col items-center">
      <img src={book.cover} alt={book.title} className="w-fit max-h-[450px] object-cover mb-4 transition-transform duration-500 ease-in-out transform hover:scale-105" />
      <h2 className="text-xl font-semibold">{book.title}</h2>
      <p className="text-sm text-gray-500">By {book.author}</p>
      <p className="text-sm mt-2 line-clamp-3">{book.summary}</p>
      <div className="flex justify-between items-center mt-4 w-full">
        <p className="text-sm">Released in {new Date(book.release_date).getFullYear()}</p>
        <Link href={`/books/${book.id}`}>
          <Button variant="outline">Book Details</Button>
        </Link>
      </div>
    </div>

  );
};


export default BookCard;
