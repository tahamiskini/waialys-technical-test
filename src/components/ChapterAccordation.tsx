import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"; 

interface Chapter {
  id: string;
  attributes: {
    title: string;
    summary: string;
  };
}

interface ChapterAccordionProps {
  chapters: Chapter[];
}

const ChapterAccordion: React.FC<ChapterAccordionProps> = ({ chapters }) => {
 

  return (
    <Accordion type="single" collapsible className="w-full">
      {chapters.map((chapter) => (
        <AccordionItem key={chapter.id} value={chapter.id}>
          <AccordionTrigger>{chapter.attributes.title}</AccordionTrigger>
          <AccordionContent>
            <p className={chapter.attributes.summary ? "" : "text-gray-500"}>
              {chapter.attributes.summary ? chapter.attributes.summary : "No content available"}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default ChapterAccordion;
