"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookDetails, fetchBookDetails, Chapter } from "@/app/models/bookDetails";
import axios from "axios";
import { BASE_PATH } from "@/consts";

export default function BookDetailsPage() {
  const params = useParams();
  const { id } = params;

  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [chapterSummary, setChapterSummary] = useState<string | null>(null);
  const [loadingChapter, setLoadingChapter] = useState(false);

  const accordionRef = useRef<any>(null); 

  useEffect(() => {
    const getBookDetails = async () => {
      if (typeof id === "string") {
        const details = await fetchBookDetails(id);
        setBook(details);
        setLoading(false);
      }
    };
    getBookDetails();
  }, [id]);

  const fetchChapterSummary = async (chapterId: string) => { 
    setLoadingChapter(true);
    try {
      const response = await axios.get(`${BASE_PATH}/books/${id}/chapters/${chapterId}`);
      setChapterSummary(response.data.data.attributes.summary || "No summary available");
    } catch (error) {
      setChapterSummary("Failed to load chapter summary");
    } finally {
      setLoadingChapter(false);
    }
  };

  const handleChapterClick = (chapterId: string) => {
    setChapterSummary(null);
    fetchChapterSummary(chapterId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 w-1/3 mb-4 rounded"></div>
            <div className="h-4 bg-gray-700 w-1/4 mb-8 rounded"></div>
            <div className="h-40 bg-gray-700 w-full rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <p className="text-red-500">Book not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[400px,1fr] gap-8">
          <div>
            <img
              src={book.attributes.cover}
              alt={book.attributes.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.attributes.title}</h1>
            <p className="text-xl text-gray-400 mb-4">{book.attributes.author}</p>
            <div className="flex gap-8 text-gray-400 mb-6">
              <p>Pages: {book.attributes.pages}</p>
              <p>Released: {book.attributes.release_date}</p>
            </div>
            <p className="text-gray-300 mb-8">{book.attributes.summary}</p>

            <div className="mt-8">
              <h2 className="text-2xl mb-4">Chapters</h2>
              <div className="space-y-2">
                <Accordion type="single" collapsible className="border-b border-gray-800" ref={accordionRef}>
                  {book.chapters && book.chapters.length > 0 ? (
                    book.chapters.map((chapter, index) => (
                      <AccordionItem
                        key={chapter.id}
                        value={chapter.id.toString()}
                        className={!chapter.attributes.summary ? "opacity-50" : ""} 
                      >
                        <AccordionTrigger
                          disabled={!chapter.attributes.summary} 
                          className="hover:no-underline py-4 text-left"
                          onClick={() => handleChapterClick(chapter.id.toString())}
                        >
                          <span className="flex items-center text-gray-300">
                            Chapter {index + 1}: {chapter.attributes.title}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-400 pb-4">
                          {loadingChapter && chapterSummary === null ? (
                            <p>Loading summary...</p>
                          ) : (
                            chapterSummary || "No summary available" 
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))
                  ) : (
                    <p>No chapters available</p>
                  )}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
