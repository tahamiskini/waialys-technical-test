import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";

interface Chapter {
  id: string;
  attributes: {
    title: string;
    summary: string;
  };
}

interface BookChaptersProps {
  chapters: Chapter[];
  openChapter: string | null;
  setOpenChapter: (id: string | null) => void;
}

const BookChapters: React.FC<BookChaptersProps> = ({
  chapters,
  openChapter,
  setOpenChapter,
}) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Chapters</h2>
      {chapters.length > 0 ? (
        <Accordion type="single" collapsible className="w-full space-y-4">
          {chapters.map((chapter, index) => (
            <AccordionItem key={chapter.id} value={chapter.id} className="border-b border-gray-700">
              <AccordionTrigger
                className="flex justify-between items-center w-full py-3 text-left text-gray-300 hover:text-white transition-all"
                onClick={() =>
                  setOpenChapter(openChapter === chapter.id ? null : chapter.id)
                }
              >
                <span className="flex items-center gap-2">
                  Chapter {index + 1}: {chapter.attributes.title || "Untitled Chapter"}
                </span>
                <span
                  className={`transform transition-transform ${
                    openChapter === chapter.id ? "rotate-180" : "rotate-0"
                  }`}
                >
                  ˅
                </span>
              </AccordionTrigger>
              <AccordionContent
                className="text-gray-400 mt-2 transition-all duration-300"
                style={{
                  height: openChapter === chapter.id ? "auto" : "0",
                  overflow: openChapter === chapter.id ? "visible" : "hidden",
                }}
              >
                {chapter.attributes.summary || "No summary available for this chapter."}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <p className="text-gray-500">No chapters available for this book.</p>
      )}
    </div>
  );
};

export default BookChapters;
