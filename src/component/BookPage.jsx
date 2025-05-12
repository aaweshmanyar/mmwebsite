import { Search, ChevronDown, User, ChevronRight, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import bg from "../../public/images/bg.png";
import Logo from "../../public/images/marclogo.png";
import Book1 from "../../public/OurBooks/book1.png";
import Book2 from "../../public/OurBooks/book2.png";
import Book3 from "../../public/OurBooks/book3.png";
import Book4 from "../../public/OurBooks/book4.png";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [writers, setWriters] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [books, setBooks] = useState([]);


  const [selectedFilters, setSelectedFilters] = useState({
    writer: "",
    translator: "",
    language: "",
    sorting: "latest",
  });


  useEffect(() => {
    const fetchData = async () => {
      try {
       
        // If not cached, fetch from API
        const writerRes = await fetch("https://newmmdata-backend.onrender.com/api/writers");
        const writerData = await writerRes.json();
        setWriters(writerData);
        

        const translatorRes = await fetch("https://newmmdata-backend.onrender.com/api/translators");
        const translatorData = await translatorRes.json();
        setTranslators(translatorData);
        

        const languageRes = await fetch("https://newmmdata-backend.onrender.com/api/languages/language");
        const languageData = await languageRes.json();
        setLanguages(languageData);
        

        const booksRes = await fetch("https://newmmdata-backend.onrender.com/api/books");
        const booksData = await booksRes.json();
        setBooks(booksData);
        

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Header */}
      {/* Header */}
      <header className="bg-[#783F1D] text-white relative z-10">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between relative">
          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white z-20"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Left Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-[15px] font-medium">
            <a href="/" className="hover:text-amber-300">Home</a>
            <a href="/about" className="hover:text-amber-300">About Center</a>
            <div className="relative group cursor-pointer">
              <div className="flex items-center hover:text-amber-300">
                Books <ChevronDown className="h-4 w-4 ml-1" />
              </div>
            </div>
          </nav>

          {/* Center Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 md:static md:translate-x-0">
            <img src={Logo} alt="Logo" className="w-16 md:w-20 object-contain" />
          </div>

          {/* Right Section */}
          <div className="hidden md:flex items-center space-x-5 font-medium text-[15px]">
            <a href="/articlefullpage" className="hover:text-amber-300">Articles</a>
            <a href="#" className="hover:text-amber-300">Gallery</a>
            <a href="#" className="hover:text-amber-300">Contact</a>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#783F1D] px-4 pb-5 space-y-4 text-[15px] font-medium z-10">
            <a href="/" className="block hover:text-amber-300">Home</a>
            <a href="/about" className="block hover:text-amber-300">About Center</a>
            <div className="block hover:text-amber-300 cursor-pointer">Books</div>
            <a href="/article" className="block hover:text-amber-300">Articles</a>
            <a href="/gallery" className="block hover:text-amber-300">Gallery</a>
            <a href="/contact" className="block hover:text-amber-300">Contact</a>

            {/* Search Bar */}
            <div className="flex items-center bg-white rounded-full px-3 py-1 mt-2 w-full">
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none text-black text-sm w-full"
              />
              <Search className="w-4 h-4 text-black ml-2" />
            </div>
          </div>
        )}
      </header>



      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>


      {/* Main Content */}
      <section className="flex-grow bg-[#f5f3e6]">
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-16">

          {/* Our Books Section*/}
          <div className="bg-[#E9D9A8] w-full rounded-2xl mx-auto px-6 md:px-10 py-10 shadow mb-10">
            <h1 className="text-[#783F1D] text-3xl font-bold text-center mb-2">Our Books</h1>
            <p className="text-center max-w-2xl mx-auto text-[16px] mb-8">
              Maula Ali Research Centre aims to research, publish, and distribute unpublished or inaccessible old Islamic manuscripts in multiple languages.
            </p>
          </div>





          {/* Urdu Search */}
          <div className="relative max-w-lg mx-auto mb-8">
            <input
              type="text"
              className="gulzartext w-full bg-white py-3 px-4 rounded-full text-center shadow text-[18px] font-medium"
              placeholder=" تلاش کریں"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 text-[16px]">
            {[
              { label: "نماسوں رسالت", count: 56 },
              { label: "عقائد", count: 236 },
              { label: "نماز", count: 22, active: true },
              { label: "اولیاء الله", count: 614 },
              { label: "رمضان المبارک", count: 56 },
            ].map((item, i) => (
              <div
                key={i}
                className={`gulzartext flex items-center px-4 py-1.5 rounded-full ${item.active
                  ? "bg-[#4A7C3A] text-white"
                  : "bg-[#E9D9A8] text-[#783F1D] hover:bg-amber-100 border-white shadow-md"
                  }`}
              >
                <span>{item.label}</span>
                <span
                  className={`ml-2 bg-white px-2 py-0.5 text-sm rounded-full ${item.active ? "text-[#4A7C3A]" : ""
                    }`}
                >
                  {item.count}
                </span>
              </div>
            ))}
          </div>


          {/* Filters */}
          {/* Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-10">
            {["Writer", "Translator", "Language", "Sorting"].map((label, i) => (
              <div key={i}>
                <p className="text-sm text-[#783F1D] font-bold mb-2">{label}</p>
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
                  {label === "Writer" && (
                    <>
                      <option value="">Select Writer</option>
                      {writers.length === 0 ? (
                        <option disabled>Loading...</option>
                      ) : (
                        writers.map((writer) => (
                          <option className="gulzartext" key={writer._id} value={writer._id}>
                            {writer.name}
                          </option>
                        ))
                      )}
                    </>
                  )}

                  {label === "Translator" && (
                    <>
                      <option value="">Select Translator</option>
                      {translators.length === 0 ? (
                        <option disabled>Loading...</option>
                      ) : (
                        translators.map((translator) => (
                          <option className="gulzartext" key={translator._id} value={translator._id}>
                            {translator.name}
                          </option>
                        ))
                      )}
                    </>
                  )}

                  {label === "Language" && (
                    <>
                      <option value="">Select Language</option>
                      {languages.length === 0 ? (
                        <option disabled>Loading...</option>
                      ) : (
                        languages.map((language) => (
                          <option className="gulzartext" key={language._id} value={language.language}>
                            {language.language}
                          </option>
                        ))
                      )}
                    </>
                  )}

                  {label === "Sorting" && (
                    <>
                      <option className="gulzartext" value="latest">Latest</option>
                      <option className="gulzartext" value="oldest">Oldest</option>
                      <option className="gulzartext" value="popular">Most Popular</option>
                    </>
                  )}
                </select>
              </div>
            ))}
          </div>





          {/* Books */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-10">
            {books.map((book, i) => (
              <div
                key={i}
                className="bg-gradient-to-t from-white border border-white p-4 rounded-lg hover:shadow-lg transition relative"
              >
                {book.tag && (
                  <div className="gulzartext absolute top-3 left-3 bg-amber-500 text-white text-xs px-2 py-0.5 rounded">
                    {book.tag}
                  </div>
                )}
                <div className="flex justify-center mb-4">
                  <img src={`https://newmmdata-backend.onrender.com/api/books/cover/${book.id}`} alt={book.title} className="h-64 object-contain" />
                </div>
                <h3 className="text-[#4A7C3A] text-lg font-bold text-center mb-2">{book.title}</h3>
                <div className="text-left text-xs text-gray-600">Writer</div>
                <div className="text-left text-[15px] mb-2">{book.author}</div>
                <div className="text-left text-xs text-gray-600">Translator</div>
                <div className="text-left text-[15px] mb-2">{book.translator}</div>
                <div className="text-left mb-3">
                  <span className="text-xs bg-[#4A7C3A] text-white px-2 py-0.5 rounded">#{book.language}</span>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  <Link to={`/bookdetail/${book.id}`} rel="noopener noreferrer">
                    <button className="text-[#783F1D] border border-black hover:bg-[#783F1D] hover:text-white px-3 py-1 rounded flex items-center text-sm">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </Link>
                  <a
                    href={`https://newmmdata-backend.onrender.com/api/books/attachment/${book.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="text-[#4A7C3A] border border-[#4A7C3A] hover:bg-[#4A7C3A] hover:text-white px-3 py-1 rounded flex items-center text-sm">
                      Download <ChevronDown className="h-4 w-4 ml-1" />
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* Footer Spacer */}

    </main>
  );
}
