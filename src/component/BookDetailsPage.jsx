import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Search, ChevronDown, User, Menu, X } from "lucide-react";
import bg from "../../public/images/newbg.png";
import Logo from "../../public/images/marclogo.png";
import Book1 from "../../public/OurBooks/book1.png";
import Book2 from "../../public/OurBooks/book2.png";
import Book3 from "../../public/OurBooks/book3.png";
import Book4 from "../../public/OurBooks/book4.png";
import sampleimg from "../../public/Sliderimage/sampleimg.jpeg";
import { Helmet } from "react-helmet"; // Add this import
import ShareButton from "./ShareEventButton";

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [writers, setWriters] = useState([]);
  const [matchedWriter, setMatchedWriter] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Fetch book
    fetch(`https://api.minaramasjid.com/api/books/${id}`)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((err) => console.error("Failed to fetch book:", err));

    //All Books
    fetch("https://api.minaramasjid.com/api/books")
      .then((res) => res.json())
      .then((data) => setAllBooks(data))
      .catch((err) => console.error("Failed to fetch all books:", err));

    // Fetch all writers
    fetch(`https://api.minaramasjid.com/api/writers`)
      .then((res) => res.json())
      .then((data) => setWriters(data))
      .catch((err) => console.error("Failed to fetch writers:", err));
  }, [id]);

  useEffect(() => {
    if (book && writers.length > 0) {
      const match = writers.find(
        (writer) => writer.name.toLowerCase() === book.author?.toLowerCase()
      );
      setMatchedWriter(match);
    }
  }, [book, writers]);

  function stripHTML(html) {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()؟“”"']/g, "") // Remove punctuation
      .replace(/[-]+/g, "-");

  const navigate = useNavigate();

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
    <main className="min-h-screen font-sans bg-[#F8F3E9] bg-[url('/images/bg.png')] bg-repeat bg-opacity-80">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>
      {/* Header */}
      <header className="bg-[#783F1D] sticky top-0 z-50 shadow-md border-b border-white">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center py-4 relative">
                 {/* Left Nav (Desktop) */}
                 <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
                   <a href="/" className="hover:opacity-[0.6]">
                     Home
                   </a>
                   <a href="/about" className="hover:opacity-[0.6]">
                     About
                   </a>
                   <a href="/newsandevent" className="hover:opacity-[0.6]">
                     News & Event
                   </a>
                   <a href="/books" className="hover:opacity-[0.6]">
                     Books
                   </a>
                 </nav>
     
                 {/* Center Logo */}
                 <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
                   <img
                     src={Logo}
                     alt="Logo"
                     className="w-16 h-16 rounded-full object-contain"
                   />
                 </div>
     
                 {/* Right Nav (Desktop) */}
                 <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
                   <a href="/article" className="hover:opacity-[0.6]">
                     Articles
                   </a>
                   <a href="/question" className="hover:opacity-[0.6]">
                     Question Answer
                   </a>
                   <a href="/requestbook" className="hover:opacity-[0.6]">
                     Request a Book
                   </a>
                   <a href="/contact" className="hover:opacity-[0.6]">
                     Contact
                   </a>
                 </nav>
     
                 {/* Mobile Menu Button */}
                 <div className="md:hidden">
                   <button
                     onClick={() => setMenuOpen(!menuOpen)}
                     className="text-white focus:outline-none"
                   >
                     <svg
                       className="w-7 h-7"
                       fill="none"
                       viewBox="0 0 24 24"
                       stroke="currentColor"
                     >
                       <path
                         strokeLinecap="round"
                         strokeLinejoin="round"
                         strokeWidth={2}
                         d={
                           menuOpen
                             ? "M6 18L18 6M6 6l12 12"
                             : "M4 6h16M4 12h16M4 18h16"
                         }
                       />
                     </svg>
                   </button>
                 </div>
               </div>
     
               {/* Mobile Dropdown Menu */}
               <div
                 className={`md:hidden transition-all overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                   }`}
               >
                 <div className="flex flex-col gap-3 py-4 px-2 bg-[#783F1D]  text-white rounded-b-xl">
                   <a
                     href="/"
                     className="text-white px-4 py-2 "
                   >
                     Home
                   </a>
                   <a
                     href="/about"
                     className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                   >
                     About
                   </a>
                   <a
                     href="/books"
                     className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                   >
                     Books
                   </a>
                   <a
                     href="/newsandevent"
                     className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                   >
                     News & Event
                   </a>
                   <a
                     href="/article"
                     className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                   >
                     Articles
                   </a>
                   <a
                     href="/question"
                     className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                   >
                     Question Answer
                   </a>
                   <a
                     href="/requestbook"
                     className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                   >
                     Request a Book
                   </a>
                   <a
                     href="/contact"
                     className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                   >
                     Contact
                   </a>
                 </div>
               </div>
             </div>
           </header>

      {/* Book Section */}
      <section className="relative  max-w-6xl mx-auto px-4 py-12">
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
                <h1 className="text-4xl font-bold text-[#558B2F] mb-4 heading">
                  {book.title}
                </h1>

                <span className="inline-block bg-yellow-600 text-white px-4 py-1 text-sm rounded-full mb-4">
                  {book.tag}
                </span>

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
        <div className="bg-white p-6 md:p-10 rounded-xl shadow mb-12">
          {matchedWriter && (
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
          )}
        </div>

        {/* Highlights */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Writer Books Highlights</h2>
            <a
              href="/books"
              className="text-[#558B2F] bg-white px-5 py-2 rounded-full shadow text-sm font-medium hover:bg-[#558B2F] hover:text-white transition-colors duration-300"
            >
              View All Books
            </a>{" "}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {limitedSuggestions.length > 0 ? (
              limitedSuggestions.map((book) => (
                <div
                  key={book._id}
                  onClick={() =>
                    navigate(`/bookdetail/${book.id}/${slugify(book.title)}`)
                  }
                  className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
                >
                  <img
                    src={`https://api.minaramasjid.com/api/books/cover/${book.id}`}
                    alt={book.title}
                    className="w-full h-48 sm:h-52 md:h-56 lg:h-64 object-cover rounded mb-3"
                  />
                  <h3 className="heading text-[#558B2F] text-base sm:text-lg font-semibold mb-1 truncate">
                    {book.title || "Untitled"}
                  </h3>
                  <a
                    href={`/bookdetail/${book.id}/${slugify(book.title)}`}
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
