"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../components/Header";
import SearchBar from "../../components/SearchBar";
import BookList from "../../components/BookList";
import Pagination from "../../components/Pagination";

export const BASE_PATH = "https://api.potterdb.com/v1";

const Page: React.FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBooks = async (page: number, query: string = "") => {
    setIsLoading(true);
    try {
      const url = query
        ? `${BASE_PATH}/books?filter[title_cont]=${query}&page[number]=${page}&page[size]=10`
        : `${BASE_PATH}/books?page[number]=${page}&page[size]=10`;

      const response = await axios.get(url);
      setBooks(response.data.data);
      setTotalPages(Math.ceil(response.data.meta.pagination.total / 10));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(currentPage);
  }, [currentPage]);

  return (
    <div className="p-8 px-32 font-sans text-foreground min-h-screen">
      <Header />
      <SearchBar
        searchQuery={searchQuery}
        onSearch={(query) => {
          setSearchQuery(query);
          setCurrentPage(1);
          fetchBooks(1, query);
        }}
        totalBooks={books.length}
      />
      {isLoading ? (
        <p className="text-center text-foreground">Loading...</p>
      ) : (
        <BookList books={books} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default Page;
