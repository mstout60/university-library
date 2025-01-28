import { auth } from "@/auth";
import BookList from "@/components/book-list";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

import React from "react";

const page = async () => {
  const session = await auth();
  const borrowedList = await db
    .select({
      id: books.id,
      title: books.title,
      author: books.author,
      genre: books.genre,
      rating: books.rating,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      description: books.description,
      totalCopies: books.totalCopies,
      availableCopies: books.availableCopies,
      videoUrl: books.videoUrl,
      summary: books.summary,
      createdAt: books.createdAt,
    })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session?.user?.id as string))
    .innerJoin(books, eq(books.id, borrowRecords.bookId));

  return (
    <>
      <BookList title="Borrowed books" books={borrowedList} />
    </>
  );
};

export default page;
