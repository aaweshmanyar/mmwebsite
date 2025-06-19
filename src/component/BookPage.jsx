import { Search, ChevronRight, Menu, X, ArrowDownToLine } from "lucide-react";
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import bg from "../../public/images/newbg.png";
import Logo from "../../public/images/marclogo.png";
import Sampleimg from "../../public/Sliderimage/sampleimg.jpeg";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [writers, setWriters] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [displayedBooks, setDisplayedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const booksPerPage = 8;

  const [selectedFilters, setSelectedFilters] = useState({
    writer: "",
    translator: "",
    language: "",
    sorting: "latest",
  });

  // Fetch data from API
 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const [writerRes, translatorRes, languageRes, booksRes] =
        await Promise.all([
          fetch("https://api.minaramasjid.com/api/writers"),
          fetch("https://api.minaramasjid.com/api/translators"),
          fetch("https://api.minaramasjid.com/api/languages/language"),
          fetch("https://api.minaramasjid.com/api/books"),
        ]);

      const writersData = await writerRes.json();
      const translatorsData = await translatorRes.json();
      const languagesData = await languageRes.json();
      const booksData = await booksRes.json();

      // Set writers - extract names from objects
      // const uniqueWriters = [...new Set(writersData.map(writer => writer.name))].filter(Boolean);
      setWriters(writersData);

      // Set translators - extract names from objects
      const uniqueTranslators = [...new Set(translatorsData.map(t => t.name))].filter(Boolean);
      setTranslators(uniqueTranslators);

      // Set languages - extract language from objects
      const uniqueLanguages = [...new Set(languagesData.map(lang => lang.language))].filter(Boolean);
      setLanguages(uniqueLanguages);

      setAllBooks(booksData);
      setFilteredBooks(booksData);
      setDisplayedBooks(booksData.slice(0, booksPerPage));
      setHasMore(booksData.length > booksPerPage);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  // Update filters and apply them
  const updateFilter = (filterName, value) => {
    const newFilters = {
      ...selectedFilters,
      [filterName]: value,
    };
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  // Apply all filters to the books
  const applyFilters = useCallback(
    (filters) => {
      let result = [...allBooks];

      // Filter by writer
      if (filters.writer) {
        result = result.filter((book) => book.author === filters.writer);
      }

      // Filter by translator
      if (filters.translator) {
        result = result.filter(
          (book) => book.translator === filters.translator
        );
      }

      // Filter by language
      if (filters.language) {
        result = result.filter((book) => book.language === filters.language);
      }

      // Sort books
      if (filters.sorting === "latest") {
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (filters.sorting === "oldest") {
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      } else if (filters.sorting === "title-asc") {
        result.sort((a, b) => a.title.localeCompare(b.title));
      } else if (filters.sorting === "title-desc") {
        result.sort((a, b) => b.title.localeCompare(a.title));
      }

      setFilteredBooks(result);
      setDisplayedBooks(result.slice(0, booksPerPage));
      setPage(1);
      setHasMore(result.length > booksPerPage);
    },
    [allBooks]
  );

  // Load more books when scrolling
  const loadMoreBooks = useCallback(() => {
    if (!hasMore) return;

    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * booksPerPage;
    const endIndex = startIndex + booksPerPage;
    const newBooks = filteredBooks.slice(startIndex, endIndex);

    if (newBooks.length === 0) {
      setHasMore(false);
      return;
    }

    setDisplayedBooks((prev) => [...prev, ...newBooks]);
    setPage(nextPage);
    setHasMore(endIndex < filteredBooks.length);
  }, [page, hasMore, filteredBooks]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 500
      ) {
        loadMoreBooks();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreBooks]);

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
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-100 z-10"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

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
            className={`md:hidden transition-all overflow-hidden ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-4 px-2 bg-white text-gray-700 rounded-b-xl">
              <a
                href="/"
                className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
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
                {writers.map((writer, index) => (
                  <option key={index} value={writer.name}>
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
                {translators.map((translator, index) => (
                  <option key={index} value={translator}>
                    {translator}
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
                {languages.map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
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
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
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
              <div className="col-span-full flex justify-center py-10">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : displayedBooks.length === 0 ? (
              <div className="col-span-full text-center py-10">
                <p className="text-gray-600">
                  No books found matching your filters.
                </p>
              </div>
            ) : (
              displayedBooks.map((book) => (
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
                      src={`https://api.minaramasjid.com/api/books/cover/${book.id}`}
                      alt={`Cover of ${book.title}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Sampleimg;
                      }}
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
                    {book.translator && (
                      <>
                        <p className="text-xs text-gray-500 mb-0.5 font-bold">
                          Translator
                        </p>
                        <p className="text-sm text-gray-600 truncate mb-2.5">
                          {book.translator}
                        </p>
                      </>
                    )}
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
                        href={`https://api.minaramasjid.com/api/books/attachment/${book.id}`}
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

          {/* Loading indicator for infinite scroll */}
          {hasMore && !loading && (
            <div className="flex justify-center py-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
