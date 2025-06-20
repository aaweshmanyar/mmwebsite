import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Eye, Menu, X } from "lucide-react";
import Logo from "../../public/images/marclogo.png";
import bg from "../../public/images/bg.png";
import { useNavigate } from "react-router-dom";
import sampleimg from "../../public/Sliderimage/sampleimg.jpeg";

const EnhancedUIDesign = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [language, setLanguage] = useState("All");
  const [sorting, setSorting] = useState("Latest");
  const [search, setSearch] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const languageOptions = ["All", "اردو", "English", "Roman"];
  const sortOptions = ["Latest", "Oldest"];

  useEffect(() => {
    const savedViewMode = localStorage.getItem("viewMode");
    if (savedViewMode === "list") {
      setViewMode("list");
    } else {
      setViewMode("grid");
    }
  }, []);

  const setGridView = () => {
    setViewMode("grid");
    localStorage.setItem("viewMode", "grid");
  };

  const setListView = () => {
    setViewMode("list");
    localStorage.setItem("viewMode", "list");
  };

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://api.minaramasjid.com/api/questions"
        );
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  // Filtered questions based on search input and language
  const filteredQuestions = questions
    .filter((q) => {
      // Language filter
      if (language !== "All") {
        return q.language === language;
      }
      return true;
    })
    .filter((q) => {
      // Search filter
      const text = (q.questionUrdu || q.questionEnglish || "").toLowerCase();
      return text.includes(search.toLowerCase());
    })
    .sort((a, b) => {
      // Sorting
      if (sorting === "Latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });

  const navigate = useNavigate();

  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')                    // Replace spaces with hyphens
      .replace(/[.,\/#!$%\^&\*;:{}=\_`~()؟""']/g, '')  // Remove punctuation
      .replace(/[-]+/g, '-');                  // Replace multiple hyphens with single

  return (
    <div className="bg-slate-50 text-slate-800">
      <header className="bg-[#718e56] sticky top-0 z-50 shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            <nav className="hidden md:flex gap-6 text-md text-white tracking-wide">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/newsandevent">News & Event</a>
              <a href="/books">Books</a>
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
              <img
                src={Logo}
                alt="Logo"
                className="w-16 h-16 rounded-full object-contain"
              />
            </div>

            <nav className="hidden md:flex gap-6 text-md text-white tracking-wide">
              <a href="/article">Articles</a>
              <a href="/question">Question Answer</a>
              <a href="/requestbook">Request a Book</a>
              <a href="/contact">Contact</a>
            </nav>

            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 focus:outline-none"
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

          {/* Mobile menu */}
          <div
            className={`md:hidden transition-all overflow-hidden ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-4 px-2 text-white bg-[#5a7544] rounded-b-xl">
              <a href="/" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                Home
              </a>
              <a href="/about" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                About
              </a>
              <a
                href="/books"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Books
              </a>
              <a href="/newsandevent" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                News & Event
              </a>
              <a
                href="/article"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Articles
              </a>
              <a
                href="/question"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Question Answer
              </a>
              <a
                href="/requestbook"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Request a Book
              </a>
              <a
                href="/contact"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      </header>

      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* Intro Section */}
      <div
        className="relative z-40 w-full rounded-b-4xl -mt-8 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="flex items-center justify-center mt-8 h-[200px] w-full bg-[#C0D7AA]/80 rounded-b-4xl sm:mt-8">
          <div className="text-center mb-6 px-4">
            <h3 className="text-2xl font-bold text-[#4a7031] gulzartext mt-12">
              شرعی سوالات
            </h3>
            <p className="text-md text-gray-700 gulzartext">
              ہمارے مرکز کا مقصد اسلامی تعلیمات کی روشنی میں موجودہ مسائل کا حل
              پیش کرنا ہے۔ یہاں آپ سوالات پوچھ سکتے ہیں یا دوسروں کے سوالات کے
              جوابات دے سکتے ہیں۔
            </p>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2 md:px-4">
          <div className="relative w-full md:w-2/5 lg:w-1/3">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
              <Search className="h-5 w-5 text-slate-400" />
            </div>
            <input
              type="text"
              className="font-nastaliq block w-full rounded-full bg-white border border-slate-300 py-2.5 px-4 text-right pr-12 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm placeholder-slate-400"
              placeholder="تلاش کریں"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {/* Sort Dropdown */}
            <div className="relative">
              <div className="flex flex-col">
                <label
                  htmlFor="sort-by"
                  className="text-xs text-slate-600 mb-1 font-nastaliq"
                >
                  ترتیب
                </label>
                <div className="relative">
                  <button
                    id="sort-by"
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center justify-between gap-2 bg-white border border-slate-300 rounded-md px-3 py-1.5 w-40 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <span className="text-slate-700">{sorting}</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>
                  {showSortDropdown && (
                    <div className="absolute z-10 mt-1 w-40 bg-white shadow-lg rounded-md py-1 border border-slate-200">
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-100 ${
                            sorting === option ? "bg-emerald-50 text-emerald-700" : "text-slate-700"
                          }`}
                          onClick={() => {
                            setSorting(option);
                            setShowSortDropdown(false);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <div className="flex flex-col">
                <label
                  htmlFor="language-filter"
                  className="text-xs text-slate-600 mb-1 font-nastaliq"
                >
                  زبان
                </label>
                <div className="relative">
                  <button
                    id="language-filter"
                    onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                    className="flex items-center justify-between gap-2 bg-white border border-slate-300 rounded-md px-3 py-1.5 w-40 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <span className="font-nastaliq text-slate-700">{language}</span>
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  </button>
                  {showLanguageDropdown && (
                    <div className="absolute z-10 mt-1 w-40 bg-white shadow-lg rounded-md py-1 border border-slate-200">
                      {languageOptions.map((lang) => (
                        <button
                          key={lang}
                          className={`w-full text-left px-3 py-1.5 text-sm hover:bg-slate-100 ${
                            language === lang ? "bg-emerald-50 text-emerald-700" : "text-slate-700"
                          }`}
                          onClick={() => {
                            setLanguage(lang);
                            setShowLanguageDropdown(false);
                          }}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="relative sm:mt-[1.35rem]">
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md border border-slate-200">
                <button
                  id="listToggleBtn"
                  title="List View"
                  onClick={setListView}
                  className={`cursor-pointer p-1.5 rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    viewMode === "list"
                      ? "layout-toggle-active bg-emerald-500 text-white hover:bg-emerald-600"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-list"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3.01" y1="6" y2="6" />
                    <line x1="3" x2="3.01" y1="12" y2="12" />
                    <line x1="3" x2="3.01" y1="18" y2="18" />
                  </svg>
                </button>
                <button
                  id="gridToggleBtn"
                  title="Grid View"
                  onClick={setGridView}
                  className={`cursor-pointer p-1.5 rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                    viewMode === "grid"
                      ? "layout-toggle-active bg-emerald-500 text-white hover:bg-emerald-600"
                      : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-layout-grid"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="flex justify-end mb-6 px-2 md:px-4">
          <h2 className="font-nastaliq bg-emerald-100 text-emerald-700 rounded-full px-5 py-2 text-base font-semibold">
            سوالات کی فہرست
          </h2>
        </div>

        <main
          id="cardsContainer"
          className={`w-full px-2 md:px-4 ${
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
              : "flex flex-col gap-3"
          }`}
        >
          {loading ? (
            <div className="flex flex-col justify-center items-center h-screen bg-slate-100 space-y-6">
              {/* Spinner */}
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>

              {/* Durood Shareef */}
              <div className="amiri-regular text-2xl text-emerald-700 font-semibold arabic-text">
                صَلَّى ٱللّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ
              </div>
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="w-full text-center py-10">
              <p className="font-nastaliq text-lg text-slate-600">
                کوئی سوال دستیاب نہیں ہے
              </p>
            </div>
          ) : (
            filteredQuestions.map((card, index) => (
              <div
                key={card._id}
                onClick={() => navigate(`/question/${card.id}/${slugify(card.slug)}`)}
                className={`card-item bg-white rounded-xl shadow-lg p-5 flex cursor-pointer w-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 ${
                  viewMode === "list" ? "flex-row items-center" : "flex-col"
                }`}
              >
                <div
                  className={`card-tag-section flex justify-end items-start ${
                    viewMode === "list" ? "mb-0 ml-4 flex-shrink-0" : "mb-3"
                  }`}
                >
                  <div className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5 self-start">
                    <span className="font-nastaliq">سوال</span>
                    <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold text-emerald-700">
                      {index + 1}
                    </span>
                  </div>
                </div>
                <div
                  className={`card-content-section ${
                    viewMode === "list"
                      ? "flex-grow mb-0 text-right"
                      : "flex-grow mb-4"
                  }`}
                >
                  <p
                    className={`${
                      viewMode === "list" ? "line-clamp-1 mb-2" : "line-clamp-2"
                    } ${
                      card.language === "Urdu"
                        ? "text-center font-nastaliq"
                        : "text-center"
                    } text-slate-700 text-base leading-relaxed gulzartext`}
                    dir={card.language === "Urdu" ? "rtl" : "ltr"}
                    dangerouslySetInnerHTML={{
                      __html: card.questionUrdu || card.questionEnglish,
                    }}
                  ></p>
                </div>
                <div
                  className={`card-actions-section flex justify-end gap-2 ${
                    viewMode === "list"
                      ? "mt-0 mr-auto flex-shrink-0"
                      : "mt-auto"
                  }`}
                >
                  <button className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors">
                    {card.language === "اردو" ? "اردو" : "English"}
                  </button>
                  <button className="cursor-pointer font-nastaliq bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors">
                    {card.language === "اردو" ? "اردو" : "English"}
                  </button>
                </div>
              </div>
            ))
          )}
        </main>
      </div>

      <style jsx global>{`
        body {
          font-family: "Inter", sans-serif;
          background-color: #f8fafc;
        }
        .font-nastaliq {
          font-family: "Noto Nastaliq Urdu", serif;
        }
        .gulzartext {
          font-family: "Gulzar", serif;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .layout-toggle-active {
          background-color: #10b981;
          color: white;
        }
        .layout-toggle-active:hover {
          background-color: #059669;
        }
        .arabic-text {
          font-family: "Amiri", serif;
        }
      `}</style>
    </div>
  );
};

export default EnhancedUIDesign;