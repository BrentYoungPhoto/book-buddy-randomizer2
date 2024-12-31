import { useState } from "react";
import { Button } from "@/components/ui/button";
import { books } from "@/data/books";
import BookCard from "@/components/BookCard";
import { Book } from "@/types/book";
import { Shuffle } from "lucide-react";

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  console.log("Current selected book:", selectedBook?.title);

  const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    const newBook = books[randomIndex];
    console.log("Selected new random book:", newBook.title);
    setSelectedBook(newBook);
  };

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-navy">
            Book Buddy
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover life-changing books from my personal reading journey, curated with detailed reviews and key insights.
          </p>
          
          <Button
            size="lg"
            onClick={getRandomBook}
            className="bg-navy hover:bg-navy/90 text-white"
          >
            <Shuffle className="mr-2 h-5 w-5" />
            Get Random Book
          </Button>
        </div>

        {selectedBook && (
          <div className="mt-12">
            <BookCard book={selectedBook} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;