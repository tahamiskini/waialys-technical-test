import React from "react";

interface BookDetailsProps {
  title: string;
  author: string;
  pages: number;
  releaseDate: string;
  summary: string;
}

const BookDetails: React.FC<BookDetailsProps> = ({
  title,
  author,
  pages,
  releaseDate,
  summary,
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-lg text-gray-400 mb-2">{author}</p>
      <p className="text-gray-400 mb-2">Pages: {pages}</p>
      <p className="text-gray-400 mb-2">
        Released: {new Date(releaseDate).getFullYear()}
      </p>
      <p className="text-gray-200 mt-4">{summary}</p>
    </div>
  );
};

export default BookDetails;
