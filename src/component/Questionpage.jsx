"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import bg from "../../public/images/bg.png";
import logo from "../../public/images/marclogo.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [language, setLanguage] = useState("Urdu");
  const [sorting, setSorting] = useState("Latest");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch questions from the API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://newmmdata-backend.onrender.com/api/questions"
        );
        const data = await response.json();
        console.log("Fetched data:", data);
        setQuestions(data); // assuming API returns { questions: [...] }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

 const filteredQuestions = questions.filter((q) => {
  const text = (q.slug || q.questionEnglish || "").toLowerCase();
  return text.includes(search.toLowerCase());
});


  const section1 = filteredQuestions.slice(0, 8);
  const section2 = filteredQuestions.slice(9, 12);
  const section3 = filteredQuestions.slice(13, 27);
  const Dropdown = ({ label, selected, setSelected, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <div className="flex flex-col">
          <span className="text-xs text-gray-600 mb-1">{label}</span>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-2 bg-white border border-gray-200 rounded-md px-3 py-1.5 w-40"
          >
            <span>{selected}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg">
            {options.map((option) => (
              <div
                key={option}
                className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const SectionHeader = ({ text }) => (
    <div className="flex justify-start mb-4">
      <div className="gulzartext bg-green-100 text-green-800 rounded-full px-4 py-1 text-sm font-medium">
        {text}
      </div>
    </div>
  );

  const QuestionCard = ({ id, question }) => (
    <div
      className="bg-white rounded-lg shadow-sm p-4 flex flex-col cursor-pointer"
      onClick={() => navigate(`/question/${id}`)}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 rtl:flex-row-reverse">
          <span className="gulzartext">سوال</span>
          <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {id}
          </span>
        </div>
      </div>
      <p className="gulzartext text-right text-gray-800 mb-2 line-clamp-1"  dangerouslySetInnerHTML={{ __html: question }}>
          
      </p>
      <div className="flex justify-end gap-2 mt-auto">
        <button className="bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm transition-colors">
          Roman
        </button>
        <button className="gulzartext bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm transition-colors">
          اردو
        </button>
      </div>
    </div>
  );

  return (
    <main dir="rtl" className="min-h-screen bg-[#f0f7e6] relative font-sans">
      {/* Header Section */}
      <header className="bg-[#718e56] sticky top-0 z-50 shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            {/* Left Menu */}
            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a
                href="/contact"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Contact
              </a>
              <a
                href="/question"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Question
              </a>
              <a
                href="/requestbook"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Request Book
              </a>
              <a
                href="/article"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Article
              </a>
            </nav>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 rounded-full object-contain"
              />
            </div>

            {/* Right Menu */}
            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a
                href="/newsandevent"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                News & Event
              </a>
              <a
                href="/books"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Books
              </a>
              <a
                href="/about"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                About center
              </a>
              <a
                href="/"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Home
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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

          {/* Mobile Dropdown */}
          <div
            className={`md:hidden transform transition-all duration-300 ease-in-out overflow-hidden ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-4 px-2 text-white font-medium tracking-wide text-base bg-[#5a7544] rounded-b-xl">
              <a href="/" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                Home
              </a>
              <a href="/about" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                About Center
              </a>
              <a href="/books" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                Books
              </a>
              <a
                href="/newsandevent"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                News & Event
              </a>
              <a
                href="/requestbook"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Request a Book
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
                Questions
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

      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
        style={{ backgroundImage: `url(${bg.src})` }}
      ></div>

      {/* Intro Section */}
      <div
        className="relative z-40 w-full rounded-b-4xl -mt-8 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="flex items-center justify-center mt-4 h-[200px] w-full bg-[#C0D7AA]/80 rounded-b-4xl">
          <div className="text-center mb-6 px-4">
            <h3 className="text-2xl font-bold text-[#4a7031] gulzartext mb-2">
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

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-6">
        {/* Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4 px-4">
          {/* Search Input */}
          <div className="relative w-full md:w-[30%]">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="gulzartext block w-full rounded-full bg-white border-0 py-2 px-4 text-right pr-10 focus:ring-2 focus:ring-green-500 focus:outline-none"
              placeholder="تلاش کریں"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Dropdowns */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Dropdown
              label="ترتیب"
              selected={sorting}
              setSelected={setSorting}
              options={["Latest", "Oldest", "Most Answered", "Least Answered"]}
            />
            <Dropdown
              label="زبان"
              selected={language}
              setSelected={setLanguage}
              options={["Urdu", "English", "Arabic"]}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-600 gulzartext">
            لوڈ ہو رہا ہے...
          </p>
        ) : section1.length === 0 ? (
          <p className="text-center text-gray-600 gulzartext">
            کوئی سوالات نہیں ملے
          </p>
        ) : (
          <>
            {/* Sections */}
            <SectionHeader text="قرآن کی تعلیمات" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-[70%] m-auto">
              {filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={q._id || index}
                  id={index + 1}
                  question={q.slug || "No question text available"}
                />
              ))}
            </div>

            <SectionHeader text="حدیث کے سوال" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 w-[70%] m-auto">
              {filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={`section2-${q._id || index}`}
                  id={index + 1}
                  question={q.slug || "No question text available"}
                />
              ))}
            </div>

            <SectionHeader text="قرآن کی آیات" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[70%] m-auto">
              {filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={`section3-${q._id || index}`}
                  id={index + 1}
                  question={q.slug || "No question text available"}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
