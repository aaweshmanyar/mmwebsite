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
      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()؟"']/g, "")
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

  // Number of suggested books to show
  const bookLimit = 5;

  // Filter out the current book
  const suggestedBooks =
    book && allBooks.length > 0 ? allBooks.filter((b) => b.id !== book.id) : [];

  // Optional: Shuffle books randomly (to avoid same suggestions every time)
  const shuffledSuggestions = suggestedBooks.sort(() => 0.5 - Math.random());

  // Final limited suggestions
  const limitedSuggestions = shuffledSuggestions.slice(0, bookLimit);

  const title = book?.title || "Book Details";
  const pageUrl = window.location.href;
  const description = book?.description
    ? stripHTML(book.description).substring(0, 150)
    : "Explore this book.";
  const imageUrl = `https://api.minaramasjid.com/api/books/cover/${book?.id}`;

  return (
    <main className="min-h-screen font-sans bg-[#F8F3E9] bg-[url('/images/bg.png')] bg-repeat">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <section className="relative max-w-6xl mx-auto px-4 py-12">
        {book ? (
          <div className="bg-gradient-to-br from-[#FDF6E3] to-[#EFE2BB] p-6 md:p-12 rounded-2xl mb-12 shadow-xl">
            <div className="flex flex-col md:flex-row gap-10 items-start">
              {/* Book Cover with angled shadow */}
              <div className="md:w-1/3 flex justify-center">
                <div className="relative w-64">
                  <img
                    src={`https://api.minaramasjid.com/api/books/cover/${book.id}`}
                    alt={book.title}
                    className="w-full rounded-xl shadow-2xl transform rotate-[-2deg]"
                  />
                </div>
              </div>

              {/* Book Details */}
              <div className="md:w-2/3">
                <h1 className="text-4xl font-bold text-[#558B2F] mb-4 gulzartext">
                  {book.title}
                </h1>

                {book.tag && (
                  <span className="inline-block bg-yellow-600 text-white px-4 py-1 text-sm rounded-full mb-4">
                    {book.tag}
                  </span>
                )}

                <div className="mb-4">
                  <p className="text-[#5D4037] font-semibold text-sm">Writer</p>
                  <p className="text-lg font-bold">{book.author}</p>
                </div>

                <div className="mb-4">
                  <p className="text-[#5D4037] font-semibold text-sm">
                    Translator
                  </p>
                  <p className="text-lg font-bold">{book.translator}</p>
                </div>

                <p className="text-gray-700 text-base mb-8 leading-relaxed gulzartext">
                  {stripHTML(book.description || "")}
                </p>

                <a
                  href={`https://api.minaramasjid.com/api/books/attachment/${book.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="flex items-center border border-[#558B2F] text-[#558B2F] px-6 py-2 rounded-full hover:bg-[#558B2F] hover:text-white transition duration-200">
                    Download
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10">
            Loading book details...
          </div>
        )}

        {/* About Writer */}
        {matchedWriter && (
          <div className="bg-white p-6 md:p-10 rounded-xl shadow mb-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <img
                src={`https://api.minaramasjid.com/api/writers/image/${matchedWriter.id}`}
                alt="Writer"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h2 className="text-[#DAA520] text-lg font-semibold">
                  About Writer
                </h2>
                <h3 className="text-xl font-bold mb-2">
                  {book?.author || "Loading..."}
                </h3>

                <p
                  className="text-sm text-gray-700"
                  dangerouslySetInnerHTML={{
                    __html: matchedWriter
                      ? matchedWriter.englishDescription
                      : "Biography not available for this writer.",
                  }}
                ></p>
              </div>
            </div>
          </div>
        )}

        {/* Highlights */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Writer Books Highlights</h2>
            <a
              href="/books"
              className="text-[#558B2F] bg-white px-5 py-2 rounded-full shadow text-sm font-medium hover:bg-[#558B2F] hover:text-white transition-colors duration-300"
            >
              View All Books
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {limitedSuggestions.length > 0 ? (
              limitedSuggestions.map((book) => (
                <div
                  key={book._id}
                  onClick={() =>
                    navigate(`/book/${book.id}/${slugify(book.title)}`)
                  }
                  className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={`https://api.minaramasjid.com/api/books/cover/${book.id}`}
                    alt={book.title}
                    className="w-full h-48 sm:h-52 md:h-56 lg:h-64 object-cover rounded mb-3"
                  />
                  <h3 className="gulzartext text-[#558B2F] text-base sm:text-lg font-semibold mb-1 truncate">
                    {book.title || "Untitled"}
                  </h3>
                  <a
                    href={`/book/${book.id}/${slugify(book.title)}`}
                    className="text-[#DAA520] text-sm flex items-center hover:underline"
                  >
                    Read More
                    <svg
                      className="ml-1 h-3 w-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14" strokeWidth="2" />
                      <path d="m12 5 7 7-7 7" strokeWidth="2" />
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-10">
                Loading book details...
              </div>
            )}
          </div>
        </div>
      </section>

      <ShareButton type="book" id={book?.id} title={book?.title} />
    </main>
  );
}