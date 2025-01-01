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
    <div className="min-h-screen bg-cream">
      <div className="relative h-[50vh] bg-navy text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 to-navy/90">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2428&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-serif font-bold">
            Book Buddy
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Discover life-changing books from my personal reading journey, curated with detailed reviews and key insights.
          </p>
          
          <Button
            size="lg"
            onClick={getRandomBook}
            className="bg-gold hover:bg-gold-light text-white text-lg"
            disabled={books.length === 0}
          >
            <Shuffle className="mr-2 h-6 w-6" />
            Get Random Book
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {selectedBook && (
          <div className="mt-12">
            <BookCard book={selectedBook} />
          </div>
        )}

        <footer className="pt-8 mt-16 border-t border-gold/20">
          <a 
            href="https://linktr.ee/RealBrentYoung" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-navy/70 hover:text-navy transition-colors inline-flex items-center gap-1"
          >
            @RealBrentYoung
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Index;