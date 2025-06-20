import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Search, ChevronDown, User, Menu, X } from "lucide-react";
import bg from "../../public/images/newbg.png";
import Logo from "../../public/images/marclogo.png";
import Book1 from "../../public/OurBooks/book1.png";
import Book2 from "../../public/OurBooks/book2.png";
import Book3 from "../../public/OurBooks/book3.png";
import Book4 from "../../public/OurBooks/book4.png";
import sampleimg from '../../public/Sliderimage/sampleimg.jpeg'

export default function BookDetailsPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [writers, setWriters] = useState([]);
  const [matchedWriter, setMatchedWriter] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
  return (
    <main className="min-h-screen font-sans bg-[#F8F3E9] bg-[url('/images/bg.png')] bg-repeat">
      {/* Header */}
    <header className="relative z-50 bg-[#783F1D] text-white">
            {/* Desktop + Mobile Nav */}
            <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between relative">
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white z-20"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
    
              {/* Left Nav */}
              <nav className="hidden md:flex items-center space-x-6 text-[15px] font-medium">
                <a href="/" className="hover:text-amber-300">
                  Home
                </a>
                <a href="/about" className="hover:text-amber-300">
                  About
                </a>
                <a href="/newsandevent" className="hover:text-amber-300">
                  News & Events
                </a>
                <a href="/books" className="hover:text-amber-300">
                  Books
                </a>
              </nav>
    
              {/* Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 z-30 bg-white rounded-full p-1 shadow-md">
                <img
                  src={Logo}
                  alt="Logo"
                  className="w-20 h-20 object-contain rounded-full"
                />
              </div>
    
              {/* Right Nav */}
              <div className="hidden md:flex items-center space-x-5 font-medium text-[15px]">
                {/* <div className="relative">
                <input
                  type="text"
                  placeholder="search"
                  className="px-4 py-1 rounded-full bg-[#E7D092] text-sm text-black placeholder:text-gray-700 outline-none"
                />
                <span className="absolute right-3 top-1.5 text-black">
                  <Search className="w-4 h-4" />
                </span>
              </div> */}
                <a href="/article" className="hover:text-amber-300">
                  Articles
                </a>
                <a href="/question" className="hover:text-amber-300">
                  Question Answer
                </a>
                <a href="/requestbook" className="hover:text-amber-300">
                  Request a Book
                </a>
                <a href="/contact" className="hover:text-amber-300">
                  Contact
                </a>
              </div>
            </div>
    
            {/* Mobile Slide-out Menu (from left) */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-40 flex">
                {/* Backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-30"
                  onClick={() => setMobileMenuOpen(false)}
                />
    
                {/* Drawer */}
                <div className="relative w-1/2 h-full bg-[#783F1D] p-4 space-y-4 text-[15px] font-medium z-50">
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="absolute top-4 right-4 text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <a href="/" className="block hover:text-amber-300">
                    Home
                  </a>
                  <a href="/about" className="block hover:text-amber-300">
                    About
                  </a>
                  <a href="/newsandevent" className="block hover:text-amber-300">
                    News & Events
                  </a>
                  <a href="/books" className="block hover:text-amber-300">
                    Books
                  </a>
                  <a href="/article" className="block hover:text-amber-300">
                    Articles
                  </a>
                  <a href="/question" className="block hover:text-amber-300">
                    Question Answer
                  </a>
                  <a href="/requestbook" className="block hover:text-amber-300">
                    Request a Book
                  </a>
                  <a href="/contact" className="block hover:text-amber-300">
                    Contact
                  </a>
    
                  {/* Search bar */}
                  <div className="flex items-center bg-white rounded-full px-3 py-1 mt-2 w-full">
                    <input
                      type="text"
                      placeholder="Search"
                      className="bg-transparent outline-none text-black text-sm w-full"
                    />
                    <Search className="w-4 h-4 text-black ml-2" />
                  </div>
                </div>
              </div>
            )}
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
                <h1 className="text-4xl font-bold text-[#558B2F] mb-4 gulzartext">{book.title}</h1>

                <span className="inline-block bg-yellow-600 text-white px-4 py-1 text-sm rounded-full mb-4">
                  {book.tag}
                </span>

                <div className="mb-4">
                  <p className="text-[#5D4037] font-semibold text-sm">Writer</p>
                  <p className="text-lg font-bold">{book.author}</p>
                </div>

                <div className="mb-4">
                  <p className="text-[#5D4037] font-semibold text-sm">Translator</p>
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
          <div className="text-center text-gray-500 py-10">Loading book details...</div>
        )}



        {/* About Writer */}
        <div className="bg-white p-6 md:p-10 rounded-xl shadow mb-12">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <img src={Logo} alt="Writer" className="w-24 h-24 rounded-full" />
            <div>
              <h2 className="text-[#DAA520] text-lg font-semibold">
                About Writer
              </h2>
              <h3 className="text-xl font-bold mb-2">{book?.author || "Loading..."}</h3>

              <p className="text-sm text-gray-700 ">
                {matchedWriter
                  ? matchedWriter.englishDescription
                  : "Biography not available for this writer."}
              </p>
            </div>
          </div>
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
            {allBooks.length > 0 ? (
              allBooks.slice(0,5).map((book) => (
                <div
                  key={book._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-md transition-shadow duration-300"
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
                    href="/books"
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



    </main>
  );
}
