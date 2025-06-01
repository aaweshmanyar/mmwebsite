"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Loader2, X, Menu } from "lucide-react";
import bg from "../../public/images/bg.png";
import Logo from "../../public/images/marclogo.png";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [language, setLanguage] = useState("Urdu");
  const [sorting, setSorting] = useState("Latest");
  const [search, setSearch] = useState("");
   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
        setQuestions(data);
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

  const isUrdu = (text) => {
  const urduRegex = /[\u0600-\u06FF]/;
  return urduRegex.test(text);
};
  const QuestionCard = ({ id, question }) => (
    
   <div
  className="bg-white rounded-lg shadow-sm p-4 flex flex-col cursor-pointer w-full"
  onClick={() => navigate(`/question/${id}`)}
>
  <div className="flex justify-end items-start mb-2">
  <div className="bg-green-100 text-green-800 rounded-full px-3 py-1 text-sm font-medium flex items-center gap-1 ltr:flex-row self-start">
    <span className="gulzartext">سوال</span>
    <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
      {id}
    </span>
  </div>
</div>


  {/* Paragraph with dynamic direction */}
  <p
    className={`gulzartext mb-2 line-clamp-1 ${
      isUrdu(question) ? 'text-right' : 'text-left'
    } text-gray-800`}
    dir={isUrdu(question) ? 'rtl' : 'ltr'}
    dangerouslySetInnerHTML={{ __html: question }}
  ></p>

  <div className="flex justify-end gap-2 mt-auto">
    <button className="cursor-pointer bg-green-50 hover:bg-green-100 text-green-700 px-3 py-1 rounded-lg text-sm transition-colors">
      Roman
    </button>
    <button className="cursor-pointer  gulzartext bg-gray-50 hover:bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors">
      اردو
    </button>
  </div>
</div>

  );

  return (
    <main  className="min-h-screen bg-[#f0f7e6] relative font-sans">
      {/* Header Section */}
        <header className="relative z-50 bg-[#718e56] text-white">
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
            <div className="relative w-1/2 h-full bg-[#718e56] p-4 space-y-4 text-[15px] font-medium z-50">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <a href="/" className="block hover:text-white">
                Home
              </a>
              <a href="/about" className="block hover:text-white">
                About
              </a>
              <a href="/newsandevent" className="block hover:text-white">
                News & Events
              </a>
              <a href="/books" className="block hover:text-white">
                Books
              </a>
              <a href="/article" className="block hover:text-white">
                Articles
              </a>
              <a href="/question" className="block hover:text-white">
                Question Answer
              </a>
              <a href="/requestbook" className="block hover:text-white">
                Request a Book
              </a>
              <a href="/contact" className="block hover:text-white">
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


      {/* Background Pattern */}
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
            <h3 className="text-2xl font-bold text-[#4a7031] gulzartext mb-2">
              شرعی سوالات
            </h3>
            <p className="text-md text-gray-700 gulzartext">
              ہمارے مرکز کا مقصد اسلامی تعلیمات کی روشنی میں موجودہ مسائل کا حل پیش کرنا ہے۔ یہاں آپ سوالات پوچھ سکتے ہیں یا دوسروں کے سوالات کے جوابات دے سکتے ہیں۔
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
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-6 w-6 animate-spin text-green-600" />
            <span className="ml-2 gulzartext text-gray-600">لوڈ ہو رہا ہے...</span>
          </div>
        ) : filteredQuestions.length === 0 ? (
          <p className="text-center text-gray-600 gulzartext">کوئی سوالات نہیں ملے</p>
        ) : (
          <>
            <SectionHeader text="سوالات کی فہرست" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {filteredQuestions.map((q, index) => (
                <QuestionCard
                  key={q._id || index}
                  id={index + 1}
                  question={q.questionEnglish || "No question text available"}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
