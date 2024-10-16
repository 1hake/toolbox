"use client";

import { useEffect, useState } from "react";

import BookmarkForm from "./components/BookmarkForm";
import BookmarkList from "./components/BookmarkList";
import { Bookmark } from "./types/types";

export default function Home() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    fetch("/api/bookmarks")
      .then((res) => res.json())
      .then((data: Bookmark[]) => setBookmarks(data))
      .catch((err) => console.error("Failed to fetch bookmarks:", err));
  }, []);

  const addBookmark = async (bookmark: Omit<Bookmark, "id">) => {
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookmark),
      });

      if (res.ok) {
        const newBookmark: Bookmark = await res.json();
        setBookmarks([...bookmarks, newBookmark]);
      }
    } catch (error) {
      console.error("Failed to add bookmark:", error);
    }
  };

  return (
    <div>
      <h1>Bookmark Toolbox</h1>
      <BookmarkForm addBookmark={addBookmark} />
      <BookmarkList bookmarks={bookmarks} />
    </div>
  );
}
