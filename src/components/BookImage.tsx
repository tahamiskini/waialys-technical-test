import React from "react";

interface BookImageProps {
  cover: string;
  title: string;
}

const BookImage: React.FC<BookImageProps> = ({ cover, title }) => {
  return (
    <img
      src={cover}
      alt={title}
      className="w-80 max-h-[32rem] object-contain rounded-md"
    />
  );
};

export default BookImage;
