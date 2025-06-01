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

  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col relative">
      <div
        className="absolute inset-0 opacity-100 pointer-events-none"
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
      <section className="flex-grow bg-[#fbf1dd]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-96">
              <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-[#783F1D]"></div>
              <p className="mt-4 text-xl font-semibold text-[#783F1D] gulzartext">
                لوڈ ہو رہا ہے...
              </p>
            </div>
          ) : (
            <>
              <section className="bg-gradient-to-b from-amber-100 to-amber-50 py-16 px-6 relative overflow-hidden mb-4 rounded-lg">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url("")`,
                      backgroundSize: "60px 60px",
                    }}
                  ></div>
                </div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                  <h1 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
                    Our Books
                  </h1>
                  <p className="text-lg md:text-xl text-amber-800 leading-relaxed max-w-3xl mx-auto">
                    Maula Ali Research Centre aims to research, publish, and
                    distribute unpublished or inaccessible old Islamic
                    manuscripts in multiple languages.
                  </p>
                </div>
              </section>

              <div className="relative max-w-lg mx-auto mb-8">
                <input
                  type="text"
                  className="gulzartext w-full bg-white py-3 px-4 rounded-full text-center shadow text-[18px] font-medium"
                  placeholder=" تلاش کریں"
                />
                <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>

              {/* Filters */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                {["Writer", "Translator", "Language", "Sorting"].map(
                  (label, i) => (
                    <div key={i}>
                      <p className="text-sm text-[#783F1D] font-bold mb-2">
                        {label}
                      </p>
                      <select
                        className="gulzartext w-full border-b border-black rounded px-3 py-2 text-sm bg-[#f5f3e6]"
                        value={selectedFilters[label.toLowerCase()]}
                        onChange={(e) =>
                          setSelectedFilters((prev) => ({
                            ...prev,
                            [label.toLowerCase()]: e.target.value,
                          }))
                        }
                      >
                        <option value="">{`Select ${label}`}</option>
                        {(label === "Writer"
                          ? writers
                          : label === "Translator"
                          ? translators
                          : label === "Language"
                          ? languages
                          : []
                        ).map((item) => (
                          <option
                            className="gulzartext"
                            key={item._id}
                            value={
                              label === "Language" ? item.language : item._id
                            }
                          >
                            {label === "Language" ? item.language : item.name}
                          </option>
                        ))}
                        {label === "Sorting" && (
                          <>
                            <option value="latest">Latest</option>
                            <option value="oldest">Oldest</option>
                            <option value="popular">Most Popular</option>
                          </>
                        )}
                      </select>
                    </div>
                  )
                )}
              </div>

              {/* Layout Toggle */}
              <div className="flex justify-end items-center mb-6 space-x-2">
                <button
                  className={`p-2 rounded border ${
                    layout === "grid" ? "border-[#783F1D]" : "border-gray-300"
                  }`}
                  onClick={() => setLayout("grid")}
                  title="Grid view"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h4v4H4zM10 6h4v4h-4zM16 6h4v4h-4zM4 12h4v4H4zM10 12h4v4h-4zM16 12h4v4h-4z" />
                  </svg>
                </button>
                <button
                  className={`p-2 rounded border ${
                    layout === "list" ? "border-[#783F1D]" : "border-gray-300"
                  }`}
                  onClick={() => setLayout("list")}
                  title="List view"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>

              {/* Book Cards */}
              <div
                className={`mb-10 ${
                  layout === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7"
                    : "flex flex-col space-y-6"
                }`}
              >
                {books.map((book, i) => (
                  <div
                    key={i}
                    className={`bg-gradient-to-t from-white border border-white p-4 rounded-lg transition relative ${
                      layout === "grid"
                        ? "flex flex-col justify-between h-[550px]"
                        : "flex flex-row items-start gap-4"
                    } hover:shadow-lg`}
                  >
                    {book.tag && (
                      <div className="gulzartext absolute top-3 left-3 bg-amber-500 text-white text-xs px-2 py-0.5 rounded">
                        {book.tag}
                      </div>
                    )}

                    <div
                      className={`${
                        layout === "grid"
                          ? "mb-4 flex justify-center"
                          : "flex-shrink-0"
                      }`}
                    >
                      <img
                        src={`https://newmmdata-backend.onrender.com/api/books/cover/${book.id}`}
                        alt={book.title}
                        className={`object-contain ${
                          layout === "grid" ? "h-64 w-full" : "h-40 w-32"
                        }`}
                      />
                    </div>

                    <div
                      className={`${
                        layout === "grid" ? "" : "flex-1 space-y-2"
                      }`}
                    >
                      <h3 className="text-[#4A7C3A] text-lg font-bold amiri-bold line-clamp-2">
                        {book.title}
                      </h3>
                      <div className="text-xs text-gray-600">Writer</div>
                      <div className="text-[15px] truncate">
                        {book.author === "Author Placeholder"
                          ? "Mufti Farooque Mahaimi"
                          : book.author}
                      </div>
                      {/* <div className="gulzartext text-[15px] truncate">{book.description}</div> */}
                      <div>
                        <span className="text-xs bg-[#4A7C3A] text-white px-2 py-0.5 rounded">
                          {book.language}
                        </span>
                      </div>

                      <div className="flex gap-2 flex-wrap mt-3">
                        <Link
                          to={`/bookdetail/${book.id}`}
                          rel="noopener noreferrer"
                        >
                          <button className="text-[#783F1D] border border-black hover:bg-[#783F1D] hover:text-white px-3 py-1 rounded-lg flex items-center text-sm">
                            Read More <ChevronRight className="h-4 w-4 ml-1" />
                          </button>
                        </Link>
                        <a
                          href={`https://newmmdata-backend.onrender.com/api/books/attachment/${book.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="text-[#4A7C3A] border border-[#4A7C3A] hover:bg-[#4A7C3A] hover:text-white px-3 py-1 rounded-lg flex items-center text-sm">
                            Download{" "}
                            <ArrowDownToLine className="h-4 w-4 ml-1" />
                          </button>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
