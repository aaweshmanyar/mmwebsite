import { Search, ChevronRight, Menu, X, ArrowDownToLine } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../../public/images/newbg.png";
import Logo from "../../public/images/marclogo.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [writers, setWriters] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [layout, setLayout] = useState("grid");

  const [selectedFilters, setSelectedFilters] = useState({
    writer: "",
    translator: "",
    language: "",
    sorting: "latest",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [writerRes, translatorRes, languageRes, booksRes] =
          await Promise.all([
            fetch("https://newmmdata-backend.onrender.com/api/writers"),
            fetch("https://newmmdata-backend.onrender.com/api/translators"),
            fetch(
              "https://newmmdata-backend.onrender.com/api/languages/language"
            ),
            fetch("https://newmmdata-backend.onrender.com/api/books"),
          ]);

        setWriters(await writerRes.json());
        setTranslators(await translatorRes.json());
        setLanguages(await languageRes.json());
        setBooks(await booksRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [viewMode, setViewMode] = useState("grid");

  useEffect(() => {
    // Any initialization code can go here
  }, []);

  const setActiveButton = (activeMode) => {
    setViewMode(activeMode);
  };

  const applyGridView = () => {
    setActiveButton("grid");
  };

  const applyListView = () => {
    setActiveButton("list");
  };
  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col relative">
      {/* Background Image Layer */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-100 -z-10"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
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

      {/* Main Content */}
      <div className="bg-slate-100 text-gray-700 antialiased">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
          {/* Hero Section */}
          <section className="py-12 mb-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-5">
              Explore Our Collection
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto text-left sm:text-center">
              Discover rare manuscripts and insightful publications from the
              Maula Ali Research Centre.
            </p>
          </section>

          {/* Search Bar */}
          <div className="relative max-w-xl mx-auto mb-12">
            <input
              type="text"
              className="w-full bg-white py-4 pl-6 pr-12 rounded-full shadow-md text-base text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow font-gulzar text-right"
              placeholder="تلاش کریں..."
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <label className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
                Writer
              </label>
              <select
                value={selectedFilters.writer}
                onChange={(e) => updateFilter("writer", e.target.value)}
                className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow"
              >
                <option value="">All Writers</option>
                {writers.map((writer) => (
                  <option
                    key={writer._id}
                    value={writer.name}
                    className="gulzartext"
                  >
                    {writer.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
                Translator
              </label>
              <select
                value={selectedFilters.translator}
                onChange={(e) => updateFilter("translator", e.target.value)}
                className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow"
              >
                <option value="">All Translators</option>
                {translators.map((translator) => (
                  <option
                    key={translator._id}
                    value={translator.name}
                    className="gulzartext"
                  >
                    {translator.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
                Language
              </label>
              <select
                value={selectedFilters.language}
                onChange={(e) => updateFilter("language", e.target.value)}
                className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option
                    key={lang._id}
                    value={lang.language}
                    className="gulzartext"
                  >
                    {lang.language}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
                Sort By
              </label>
              <select
                value={selectedFilters.sorting}
                onChange={(e) => updateFilter("sorting", e.target.value)}
                className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow"
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          {/* Layout Toggle */}
          <div className="flex justify-end items-center mb-8 space-x-3">
            <button
              id="gridViewBtn"
              onClick={applyGridView}
              className={`toggle-button p-2.5 rounded-full ${
                viewMode === "grid"
                  ? "bg-green-600 text-white active"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
              title="Grid view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
              </svg>
            </button>
            <button
              id="listViewBtn"
              onClick={applyListView}
              className={`toggle-button p-2.5 rounded-full ${
                viewMode === "list"
                  ? "bg-green-600 text-white active"
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
              title="List view"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>

          {/* Books Display */}
          <div
            className={`${
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                : "flex flex-col space-y-6"
            } mb-10`}
          >
            {loading ? (
              <p>Loading...</p>
            ) : books.length === 0 ? (
              <p>No books found.</p>
            ) : (
              books.map((book) => (
                <div
                  key={book._id}
                  className={`bg-white rounded-xl shadow-lg overflow-hidden ${
                    viewMode === "grid"
                      ? "flex flex-col"
                      : "sm:flex sm:max-h-40"
                  }`}
                >
                  <div
                    className={
                      viewMode === "grid"
                        ? "h-64 w-full"
                        : "sm:w-36 flex-shrink-0 h-full"
                    }
                  >
                    <img
                      src={`https://newmmdata-backend.onrender.com/api/books/cover/${book.id}`}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-green-700 text-lg font-semibold mb-1.5 gulzartext">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-0.5 font-bold">
                      Writer
                    </p>
                    <p className="text-sm text-gray-600 truncate mb-2.5">
                      {book.author}
                    </p>
                    <div className="mb-4">
                      <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium">
                        {book.language}
                      </span>
                    </div>
                    <div className="mt-auto flex gap-2">
                      <a
                        href={`/bookdetail/${book.id}`}
                        className="cursor-pointer bg-green-600 text-white px-2.5 py-1 rounded-full text-xs"
                      >
                        Read More
                      </a>
                      <a
                        href={`https://newmmdata-backend.onrender.com/api/books/attachment/${book.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer bg-amber-400 text-gray-800 px-2.5 py-1 rounded-full text-xs"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
