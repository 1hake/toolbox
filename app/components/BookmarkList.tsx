import { Bookmark } from "../types/types";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-black shadow-md rounded-lg p-4 mb-4">{children}</div>
  );
};

const BookmarkList = ({ bookmarks }: { bookmarks: Bookmark[] }) => {
  console.log(bookmarks);
  return (
    <ul className="space-y-4">
      {bookmarks &&
        bookmarks.map((bookmark, index) => (
          <Card key={index}>
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              {bookmark.name}
            </a>
          </Card>
        ))}
    </ul>
  );
};

export default BookmarkList;
