import { FormEvent, useState } from "react";

interface BookmarkFormProps {
  addBookmark: (bookmark: { name: string; url: string }) => void;
}

const BookmarkForm: React.FC<BookmarkFormProps> = ({ addBookmark }) => {
  const [name, setName] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name && url) {
      addBookmark({ name, url });
      setName("");
      setUrl("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 mb-4"
    >
      <div className="mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bookmark Name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Bookmark URL"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Add Bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;
