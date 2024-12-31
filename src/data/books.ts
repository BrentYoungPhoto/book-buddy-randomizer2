import { Book } from "../types/book";

export const books: Book[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "/placeholder.svg",
    review: "A transformative book that breaks down the science of habit formation into practical, actionable steps. Clear's writing style makes complex concepts accessible and immediately applicable.",
    keyTakeaways: [
      "Small habits compound over time to create remarkable results",
      "Environment design is more important than motivation",
      "Identity-based habits are more likely to stick than outcome-based ones",
      "The four laws of behavior change: make it obvious, attractive, easy, and satisfying"
    ],
    affiliateLink: "https://example.com/atomic-habits"
  },
  {
    id: 2,
    title: "Deep Work",
    author: "Cal Newport",
    coverUrl: "/placeholder.svg",
    review: "An essential read for anyone looking to produce high-quality work in an increasingly distracted world. Newport presents compelling arguments for deep work's importance in the modern economy.",
    keyTakeaways: [
      "Deep work is becoming increasingly rare and valuable",
      "Your ability to focus intensely needs to be trained",
      "Schedule every minute of your day",
      "Create strict boundaries between work and leisure"
    ],
    affiliateLink: "https://example.com/deep-work"
  }
];