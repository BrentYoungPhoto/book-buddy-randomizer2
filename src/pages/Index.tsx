import { useState } from "react";
import { Button } from "@/components/ui/button";
import BookCard from "@/components/BookCard";
import { Book } from "@/types/book";
import { Shuffle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      console.log("Fetching books from Supabase...");
      const { data, error } = await supabase
        .from('books')
        .select('*');
      
      if (error) {
        console.error("Error fetching books:", error);
        throw error;
      }
      
      console.log("Fetched books:", data);
      return data;
    }
  });

  const getRandomBook = () => {
    const randomIndex = Math.floor(Math.random() * books.length);
    const newBook = books[randomIndex];
    console.log("Selected new random book:", newBook.title);
    setSelectedBook(newBook);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cream py-12 px-4 flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading books...</p>
      </div>
    );
  }

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
            disabled={books.length === 0}
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