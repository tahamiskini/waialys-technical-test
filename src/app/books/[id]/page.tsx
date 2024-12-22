"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { BASE_PATH } from "@/consts";
import ChapterAccordion from "@/components/ChapterAccordation";
import SkeletonC from "@/components/SkeletonC";




const  BookDetailsPage: React.FC = () => {
  const { id } = useParams();
  
  
  const [book, setBook] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [Loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
 

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await axios.get(`${BASE_PATH}${id}`);
        const bookData = res.data.data;
        setBook(bookData);

        try {
          const resChapter = await axios.get(`${BASE_PATH}${id}/chapters`);
          setChapters(resChapter.data.data );
          
          
        } catch (error) {
          console.warn("No chapters ");
          
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (Loading) return <SkeletonC/>;
  if (error) return <p className="text-red-500">{error}</p>;
 

  const { attributes } = book;
 
  

  return (
    <div className="p-6 px-32 text-white min-h-screen">
      <img src={attributes.cover} alt={attributes.title} className="w-full max-h-96 object-cover mb-4" />
      <h1 className="text-3xl font-bold">{attributes.title}</h1>
      <p className="text-xl text-gray-500">By {attributes.author}</p>
      <p className="text-md text-gray-400">Pages: {attributes.pages}</p>
      <p className="text-md text-gray-400">Released in {new Date(attributes.release_date).getFullYear()}</p>
      <p className="mt-4">{attributes.summary}</p>
      <ChapterAccordion chapters={chapters} />
    </div>
  );
};

export default BookDetailsPage;