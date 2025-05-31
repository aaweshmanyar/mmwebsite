import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { Search, ChevronDown, User, ChevronRight, Menu, X , ArrowDownToLine, Slice} from "lucide-react";

import { Navigate, useNavigate, Link } from "react-router-dom";

export default function WriterProfile() {
  const [writer, setWriter] = useState([]);
  const [book, setBook] = useState([]);
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // If not cached, fetch from API
        const writerRes = await fetch(
          "https://newmmdata-backend.onrender.com/api/writers"
        );
        const writerData = await writerRes.json();
        setWriter(writerData);
        console.log(writerData);

        const bookRes = await fetch(
          "https://newmmdata-backend.onrender.com/api/books"
        );
        const bookData = await bookRes.json();
        setBook(bookData);
        console.log(bookData);

        const questionRes = await fetch(
          "https://newmmdata-backend.onrender.com/api/questions"
        );
        const questionData = await questionRes.json();
        setQuestion(questionData);
        console.log(questionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const books = [
    {
      title: "Sayedul Astagfar",
      writer: "Hazrat Makhdoom Ali Mahaimi",
      translator: "Mufti Farooq Mahaimi",
    },
    {
      title: "Ghayatul Wajud",
      writer: "Hazrat Makhdoom Ali Mahaimi",
      translator: "Mufti Farooq Mahaimi",
    },
    {
      title: "The Eloquenc",
      writer: "Hazrat Makhdoom Ali Mahaimi",
      translator: "Mufti Farooq Mahaimi",
    },
    {
      title: "Zameerul Insan",
      writer: "Hazrat Makhdoom Ali Mahaimi",
      translator: "Mufti Farooq Mahaimi",
    },
  ];

  const questions = [
    {
      id: 1,
      arabicText: "اردو",
      romanText: "Roman",
      questionNumber: "101",
      content:
        "کیا آپ نے ہمیں بتایا ہے کہ آپ کون سے مسائل کا سامنا کر رہے ہیں؟ اگر ہاں تو ہمیں بتائیں کہ آپ کو کیا مدد چاہیے۔",
    },
    {
      id: 2,
      arabicText: "اردو",
      romanText: "Roman",
      questionNumber: "102",
      content:
        "کیا آپ نے اپنی مشکلات کے بارے میں تفصیل سے بتایا؟ اگر ہاں تو براہ کرم مزید وضاحت کریں۔",
    },
  ];

  const [language, setLanguage] = useState("english");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "urdu" : "english"));
  };

  const [qstlanguage, setQstlanguage] = useState([]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#f5f1e8] py-8 px-4 -mt-5">
        <div className="max-w-6xl mx-auto">
          {/* Language Toggle Section */}

          {/* About Writer Section */}
          <div className="bg-white rounded-lg p-6 sm:p-8 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8">
              {/* Image Section */}
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200">
                <img
                  src={`https://newmmdata-backend.onrender.com/api/writers/image/17`}
                  alt="Mufti Farooq Mahaimi"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text Content Section */}
              <div className="flex-1 text-center md:text-left w-full">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <h2 className="text-[#d4af37] text-lg font-medium">
                    About Writer
                  </h2>

                  <button
                    onClick={toggleLanguage}
                    className="flex border-white rounded-full bg-[#d4af37] p-1"
                  >
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        language === "english"
                          ? "bg-white text-black"
                          : "text-white"
                      }`}
                    >
                      English
                    </span>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${
                        language === "urdu"
                          ? "bg-white text-black"
                          : "text-white"
                      }`}
                    >
                      اردو
                    </span>
                  </button>
                </div>

                {/* Name and Description */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
                  {writer[1]?.name || "Mufti Farooq Mahaimi"}
                </h1>
                <p
                  className={`gulzartext text-gray-700 leading-relaxed text-sm sm:text-base ${
                    language === "urdu" ? "text-right" : ""
                  }`}
                  dir={language === "urdu" ? "rtl" : "ltr"}
                  dangerouslySetInnerHTML={{
                    __html:
                      (language === "urdu"
                        ? writer[1]?.urduDescription
                        : writer[1]?.englishDescription) ||
                      "Mufti Farooq Mahaimi, a renowned Islamic scholar and writer has made significant contributions to Islamic literature. His extensive research and insightful analysis have enriched the understanding of Islamic teachings.",
                  }}
                ></p>
              </div>
            </div>
          </div>

          {/* Books Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Books</h2>
            <p className="text-gray-600 text-lg">
              Discover, Research, and Connect with Books
            </p>
          </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-10">
            {book.slice(0,4).map((book, i) => (
              <div
                key={i}
                className="cursor-pointer bg-gradient-to-t from-white border border-white p-4 rounded-lg hover:shadow-lg transition relative"
              >
                {book.tag && (
                  <div className="gulzartext absolute top-3 left-3 bg-amber-500 text-white text-xs px-2 py-0.5 rounded">
                    {book.category}
                  </div>
                )}
                <div className="flex justify-center mb-4">
                  <img src={`https://newmmdata-backend.onrender.com/api/books/cover/${book.id}`} alt={book.title} className="h-64 object-contain" />
                </div>
                <h3 className="text-[#4A7C3A] text-lg font-bold text-center mb-2 amiri-bold ">{book.title}</h3>
                <div className="text-left text-xs text-gray-600">Writer</div>
                <div className="text-left text-[15px] mb-2"> {book.author === "Author Placeholder" ? "Farooque Mahaimi" : book.author}</div>
                <div className="text-left text-xs text-gray-600">Translator</div>
                <div className="text-left text-[15px] mb-2">{book.translator}</div>
                <div className="text-left mb-3">
                  <span className="text-xs bg-[#4A7C3A] text-white px-2 py-0.5 rounded">#{book.language}</span>
                </div>
                <div className="flex justify-center gap-2 flex-wrap">
                  <Link to={`/bookdetail/${book.id}`} rel="noopener noreferrer">
                    <button className="cursor-pointer text-[#783F1D] border border-black hover:bg-[#783F1D] hover:text-white px-3 py-1 rounded flex items-center text-sm">
                      Read More <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </Link>
                  <a
                    href={`https://newmmdata-backend.onrender.com/api/books/attachment/${book.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="cursor-pointer text-[#4A7C3A] border border-[#4A7C3A] hover:bg-[#4A7C3A] hover:text-white px-3 py-1 rounded flex items-center text-sm">
                      Download <ArrowDownToLine className="h-4 w-4 ml-1" />
                    </button>
                  </a>
                </div>
              </div>
            ))}
          </div>


          <div className="text-center mb-16">
            <button
              className="cursor-pointer border border-gray-400 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-2"
              onClick={() => navigate("/books")}
            >
              View All Books
            </button>
          </div>

          {/* Questions Section */}
          <div className="cursor-pointer text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Questions</h2>
          </div>
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={() => setLanguage("urdu")}
              className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium border ${
                language === "urdu"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLanguage("english")}
              className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium border ${
                language === "english"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              English
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {question.slice(4,8).map((questionItem) => (
              <div
                key={questionItem.id}
                className="cursor-pointer bg-white shadow-sm border-0 rounded-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="cursor-pointer bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                        {language === "urdu" ? "اردو" : "Urdu"}
                      </span>
                      <span className="cursor-pointer bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        {language === "english" ? "English" : "انگریزی"}
                      </span>
                    </div>
                    <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      سوال {questionItem.id}
                    </div>
                  </div>

                  {language === "urdu" ? (
                    <p
                      className="text-gray-800 text-right leading-relaxed line-clamp-2 gulzartext"
                      dir="rtl"
                      dangerouslySetInnerHTML={{
                        __html: questionItem.questionUrdu,
                      }}
                    ></p>
                  ) : (
                    <p
                      className="text-gray-800 text-left leading-relaxed line-clamp-2"
                      dir="ltr"
                      dangerouslySetInnerHTML={{
                        __html: questionItem.questionEnglish,
                      }}
                    ></p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-full px-8 py-2 cursor-pointer" onClick={() => navigate("/question")}>
              View All Questions
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
