import React from "react";
import { useRouter } from 'next/router';

interface CardProps {
    id: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    releaseYear: number;
}

const Card: React.FC<CardProps> = ({ id, title, author, cover, description, releaseYear }) => {
    const router = useRouter();

    const handleViewMore = () => {
        router.push(`/bookDetails?id=${id}`);
    };

    return (
        <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 m-4">
            <img className="w-full" src={cover} alt={title} style={{ width: '300px', height: '400px' }} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2 text-gray-900 dark:text-white">{title}</div>
                <p className="text-gray-700 dark:text-gray-300 text-base">By {author}</p>
                <p className="text-gray-700 dark:text-gray-300 text-base mt-2 break-words line-clamp-3">{description}</p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Released: {releaseYear}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <button
                    type="button"
                    className="inline-block rounded bg-blue-600 px-4 py-2 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700 focus:bg-blue-700 focus:outline-none focus:ring-0 active:bg-blue-800"
                    onClick={handleViewMore}
                >
                    View More
                </button>
            </div>
        </div>
    );
};

export default Card;