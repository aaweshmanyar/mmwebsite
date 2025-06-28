import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import ShareButton from "./ShareEventButton";

export default function BookDetailsBySlug() {
  const { id, slug } = useParams();
  const [book, setBook] = useState(null);
  const [writers, setWriters] = useState([]);
  const [matchedWriter, setMatchedWriter] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const navigate = useNavigate();

  const stripHTML = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()؟“”"']/g, "")
      .replace(/[-]+/g, "-");

  useEffect(() => {
    fetch(`https://api.minaramasjid.com/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        // Validate slug
        const actualSlug = slugify(data.title);
        if (slug !== actualSlug) {
          navigate(`/book/${id}/${actualSlug}`, { replace: true });
        }
      })
      .catch((err) => console.error("Failed to fetch book:", err));

    fetch("https://api.minaramasjid.com/api/books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data))
      .catch((err) => console.error("Failed to fetch all books:", err));

    fetch(`https://api.minaramasjid.com/api/writers`)
      .then((res) => res.json())
      .then((data) => setWriters(data))
      .catch((err) => console.error("Failed to fetch writers:", err));
  }, [id, slug, navigate]);

  useEffect(() => {
    if (book && writers.length > 0) {
      const match = writers.find(
        (writer) => writer.name.toLowerCase() === book.author?.toLowerCase()
      );
      setMatchedWriter(match);
    }
  }, [book, writers]);

  const title = book?.title || "Book Details";
  const pageUrl = window.location.href;
  const description = book?.description
    ? stripHTML(book.description).substring(0, 150)
    : "Explore this book.";
  const imageUrl = `https://api.minaramasjid.com/api/books/cover/${book?.id}`;

  return (
    <main className="min-h-screen font-sans bg-[#F8F3E9]">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <section className="max-w-4xl mx-auto py-12 px-4">
        {book ? (
          <div className="bg-white p-6 rounded-xl shadow">
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={`https://api.minaramasjid.com/api/books/cover/${book.id}`}
                alt={book.title}
                className="w-64 rounded shadow"
              />
              <div>
                <h1 className="text-2xl font-bold text-[#558B2F] mb-2">
                  {book.title}
                </h1>
                <p className="text-gray-700 mb-4">
                  {stripHTML(book.description || "")}
                </p>
                <p className="font-semibold">Author: {book.author}</p>
                <p className="font-semibold">Translator: {book.translator}</p>

                <a
                  href={`https://api.minaramasjid.com/api/books/attachment/${book.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700">
                    Download Book
                  </button>
                </a>

                <ShareButton type="book" id={book.id} title={book.title} />
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading book details...</div>
        )}
      </section>
    </main>
  );
}
