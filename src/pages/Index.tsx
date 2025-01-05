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
      
      const transformedBooks: Book[] = data.map(book => ({
        id: book.id,
        title: book.title,
        author: book.author,
        coverUrl: book.cover_url,
        review: book.review,
        keyTakeaways: book.key_takeaways,
        affiliateLink: book.affiliate_link
      }));
      
      console.log("Fetched books:", transformedBooks);
      return transformedBooks;
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
      <div className="max-w-6xl mx-auto space-y-4">
        <div className="text-center space-y-2">
          <img 
            src="https://media.publit.io/file/background-removed-image-HgqIrUwdQi2GjJKRGGaLTA-1.png"
            alt="Book Buddy Logo"
            className="h-80 md:h-96 mx-auto animate-fade-in"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover life-changing books from my personal reading journey, curated with detailed reviews and key insights.
          </p>
          
          <Button
            size="lg"
            onClick={getRandomBook}
            className="bg-navy hover:bg-navy/90 text-white mt-2"
            disabled={books.length === 0}
          >
            <Shuffle className="mr-2 h-5 w-5" />
            Get Random Book
          </Button>
        </div>

        {selectedBook && (
          <div className="mt-8">
            <BookCard book={selectedBook} />
          </div>
        )}

        <footer className="pt-8 mt-16 border-t border-gold/20 space-y-2">
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://linktr.ee/RealBrentYoung" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
            >
              @RealBrentYoung
            </a>
            <span className="text-navy/30">•</span>
            <a 
              href="https://buymeacoffee.com/realbrentyoung" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
            >
              Buy Me a Coffee
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;