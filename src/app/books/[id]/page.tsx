'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation'
import { fetchBookId, fetchChapterByChapterId } from '@/API/booksApi';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  

export default function BookDescription() {
  const params = useParams<{ id : string}>()

  const [book, setBook] = React.useState<any>(null);
  const [chapterData, setChapterData] = React.useState<any[]>([]);
  
  //fetch books
  const fetchBookById = async () => {
    try {
      const bookData = await fetchBookId(params.id);
      setBook(bookData);
      console.log(bookData)
    } catch (error) {
      console.log(error);
    }
  };

  //fetch chapters
  const fetchChapterByBookId = async (idChapter :string) =>{
    try {
        const chapterInfo = await fetchChapterByChapterId({id:idChapter,book_id:params.id});
        setChapterData((prevData)=>[...prevData,chapterInfo])
        console.log(chapterInfo)
    } catch (error) {
        console.log(error);
    }
  }
  useEffect(()=> {
    fetchBookById()
  },[])
  useEffect(() => {
    if (book?.relationships.chapters.data.length) {
      // Fetch each chapter's details
      book.relationships.chapters.data.forEach((chapter: { id: string }) => {
        fetchChapterByBookId(chapter.id);
      });
    }
  }, [book]);


  const cutDate = (date: string | undefined) => {
    if (!date) {
      return '';  
    }
    return date.substring(0, 4);
  }
  
  return (
    <main className="md:min-h-screen px-10 lg:min-h-screen w-full flex items-center justify-center bg-background flex-col gap-5">
    <div className='md:flex flex-direction-column flex-direction-row   lg:flex flex-direction-row justify-between gap-8 my-12'>
        <div className='md:w-full lg:w-1/3 '>
            <img src={book?.attributes.cover} alt={book?.attributes.title} className="w-full " />
        </div>
        <div className=' md:w-full my-4 lg:w-2/3 '>
            <h1 className='text-2xl'>{book?.attributes.title}</h1>
            <h1 className='text-xl  text-gray-500 '>{book?.attributes.author}</h1>

            <div className='my-5'>
            <h1 className='text-l  text-gray-500 '>Pages : {book?.attributes.pages}</h1>
            <h1 className='text-l  text-gray-500 '>Relased : {cutDate(book?.attributes.release_date)}</h1>
            </div>
            <p>{book?.attributes.summary}</p>

            <div className='my-4'>
            <h1 className='text-2xl my-5'>Chapters</h1>
            <div>
            {chapterData?.map((chapter :any, index:number) => (
                    <Accordion key={index} type="single" collapsible>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>chapter {index +1} {chapter.attributes.slug}</AccordionTrigger>
                        <AccordionContent>
                        {chapter.attributes.summary}
                        </AccordionContent>
                    </AccordionItem>
                    </Accordion>
                ))}
            

            </div>
            </div>
        </div>
        
    </div>
    </main>
  );
}
