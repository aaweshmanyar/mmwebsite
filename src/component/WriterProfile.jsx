import React, { useState, useEffect } from "react";
import Navbar from "./Navbar/Navbar";
import { ChevronRight, ArrowDownToLine, Eye } from "lucide-react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Userimg from "../../public/images/user.png";
import sampleimg from "../../public/Sliderimage/sampleimg.jpeg";

export default function WriterProfile() {
  const { id } = useParams();
  const [writer, setWriter] = useState(null);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [question, setQuestion] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [language, setLanguage] = useState("english");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch writer data
        const writerRes = await fetch(
          `https://api.minaramasjid.com/api/writers/${id}`
        );
        const writerData = await writerRes.json();
        setWriter(writerData);

        // Fetch books data
        const bookRes = await fetch(`https://api.minaramasjid.com/api/books`);
        const bookData = await bookRes.json();
        setAllBooks(bookData);

        // Fetch questions data
        const questionRes = await fetch(
          `https://api.minaramasjid.com/api/questions`
        );
        const questionData = await questionRes.json();
        setQuestion(questionData);

        // Fetch articles data
        setLoadingArticles(true);
        const articlesRes = await fetch(
          `https://api.minaramasjid.com/api/articles`
        );
        const articlesData = await articlesRes.json();
        setAllArticles(articlesData);
        setLoadingArticles(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoadingArticles(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (writer) {
      // Filter articles where the author or translator matches the writer's name
      const matchedArticles = allArticles.filter((article) => {
        // Handle cases where writers might be an array, object, or null
        const writers = article.writers || [];
        const writersArray = Array.isArray(writers) ? writers : [writers];

        return (
          writersArray.some(
            (articleWriter) =>
              articleWriter?.name?.toLowerCase() === writer.name.toLowerCase()
          ) || article.writers?.toLowerCase() === writer.name.toLowerCase()
        );
      });
      setFilteredArticles(matchedArticles);

      // Filter books where the author or translator matches the writer's name
      const matchedBooks = allBooks.filter(
        (book) =>
          book.author?.toLowerCase() === writer.name.toLowerCase() ||
          book.translator?.toLowerCase() === writer.name.toLowerCase()
      );
      setFilteredBooks(matchedBooks);
    }
  }, [writer, allArticles, allBooks]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "english" ? "urdu" : "english"));
  };

  function stripHtml(html = "") {
    return html.replace(/<[^>]*>/g, "");
  }

  function decodeHtmlEntities(text = "") {
    return text
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&nbsp;/g, " ");
  }

  function slugify(text) {
    return text
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/[\u200C\u200D]/g, "") // Remove zero-width characters (common in Arabic)
      .replace(/[^\p{L}\p{N}\-]+/gu, "") // Allow Unicode letters, numbers, and dashes
      .replace(/\-\-+/g, "-") // Replace multiple hyphens with one
      .replace(/^-+|-+$/g, ""); // Trim leading/trailing hyphens
  }

  function isUrdu(text) {
    return /[؀-ۿ]/.test(text);
  }

  function renderWriters(writers) {
    if (!writers) return null;

    const writersArray = Array.isArray(writers) ? writers : [writers];
    const validWriters = writersArray.filter((w) => w?.name);

    if (validWriters.length === 0) return null;

    return `Author: ${validWriters.map((w) => w.name).join(", ")}`;
  }

  // Number of suggested books to show
  const questionLimit = 4;

  // Filter out the current book
  const suggestedquestion =
    question && question.length > 0
      ? question.filter((b) => b.id !== question.id)
      : [];

  // Optional: Shuffle books randomly (to avoid same suggestions every time)
  const shuffledSuggestions = suggestedquestion.sort(() => 0.5 - Math.random());

  // Final limited suggestions
  const limitedSuggestions = shuffledSuggestions.slice(0, questionLimit);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#f5f1e8] py-8 px-4 -mt-5">
        <div className="max-w-6xl mx-auto">
          {/* About Writer Section */}
          <div className="bg-white rounded-lg p-6 sm:p-8 mb-12 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-gray-200">
                {writer && (
                  <img
                    src={`https://api.minaramasjid.com/api/writers/image/${writer.id}`}
                    alt={writer.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = Userimg; // set fallback image
                    }}
                  />
                )}
              </div>
              <div className="flex-1 text-center md:text-left w-full">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <h2 className="text-[#d4af37] text-lg font-medium">
                    About Writer
                  </h2>
                  <button
                    onClick={toggleLanguage}
                    className="flex border-white rounded-full bg-[#d4af37] p-1"
                  >
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${language === "english"
                          ? "bg-white text-black"
                          : "text-white"
                        }`}
                    >
                      English
                    </span>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-medium transition ${language === "urdu"
                          ? "bg-white text-black"
                          : "text-white"
                        }`}
                    >
                      اردو
                    </span>
                  </button>
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  {writer?.name || "Loading..."}
                </h1>

                <p
                  className={`gulzartext text-gray-700 leading-relaxed text-sm sm:text-base ${language === "urdu" ? "text-right" : ""
                    }`}
                  dir={language === "urdu" ? "rtl" : "ltr"}
                  dangerouslySetInnerHTML={{
                    __html:
                      language === "urdu"
                        ? decodeHtmlEntities(stripHtml(writer?.urduDescription))
                        : decodeHtmlEntities(stripHtml(writer?.englishDescription)),
                  }}
                ></p>

              </div>
            </div>
          </div>

          {/* Books Section */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Books</h2>
            <p className="text-gray-600 text-lg">
              Books by {writer?.name || "the writer"}
            </p>
          </div>

          {filteredBooks.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 mb-10">
                {filteredBooks.map((book, i) => (
                  <div
                    key={i}
                    onClick={() =>
                      navigate(`/bookdetail/${book.id}/${slugify(book.title)}`)
                    }
                    className="cursor-pointer bg-gradient-to-t from-white border border-white p-4 rounded-lg hover:shadow-lg transition relative"
                  >
                    {book.tag && (
                      <div className="gulzartext absolute top-3 left-3 bg-amber-500 text-white text-xs px-2 py-0.5 rounded">
                        {book.category}
                      </div>
                    )}
                    <div className="flex justify-center mb-4">
                      <img
                        src={`https://api.minaramasjid.com/api/books/cover/${book.id}`}
                        alt={book.title}
                        className="h-64 object-contain"
                      />
                    </div>
                    <h3 className="text-[#4A7C3A] text-lg font-bold text-center mb-2 amiri-bold ">
                      {book.title}
                    </h3>
                    <div className="text-left text-xs text-gray-600">
                      Writer
                    </div>
                    <div className="text-left text-[15px] mb-2">
                      {book.author === "Author Placeholder"
                        ? "Farooque Mahaimi"
                        : book.author}
                    </div>
                    {book.translator && (
                      <>
                        <div className="text-left text-xs text-gray-600">
                          Translator
                        </div>
                        <div className="text-left text-[15px] mb-2">
                          {book.translator === "Author Placeholder"
                            ? "Farooque Mahaimi"
                            : book.translator}
                        </div>
                      </>
                    )}
                    <div className="text-left mb-3"></div>
                    <div className="flex justify-center gap-2 flex-wrap">
                      <a
                        href={`/bookdetail/${book.id}/${slugify(book.title)}`}
                        className="cursor-pointer border inline-flex items-center text-sm text-yellow-700 bg-white px-4 py-1.5 rounded-full hover:bg-yellow-200 transition"
                      >
                        {" "}
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </a>

                      <a
                        href={`https://api.minaramasjid.com/api/books/attachment/${book.id}`}
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

              {filteredBooks.length > 4 && (
                <div className="text-center mb-16">
                  <button
                    className="cursor-pointer border border-gray-400 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-2"
                    onClick={() => navigate("/books")}
                  >
                    View All Books
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-10">
              <p className="text-slate-600">No books found for this writer</p>
            </div>
          )}

          {/* Questions Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Questions</h2>
          </div>
          <div className="flex justify-end mb-4 gap-2">
            <button
              onClick={() => setLanguage("urdu")}
              className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium border ${language === "urdu"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700"
                }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLanguage("english")}
              className={`cursor-pointer px-4 py-1 rounded-full text-sm font-medium border ${language === "english"
                  ? "bg-green-500 text-white"
                  : "bg-white text-gray-700"
                }`}
            >
              English
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {limitedSuggestions.map((questionItem) => (
              <div
                key={questionItem.id}
                onClick={() => navigate("/question")}
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
                        __html:
                          questionItem.questionUrdu ||
                          "اردو تفصیل دستیاب نہیں ہے۔",
                      }}
                    ></p>
                  ) : (
                    <p
                      className="gulzartext text-gray-800 text-left leading-relaxed line-clamp-2"
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

          <div className="text-center mb-16">
            <button
              className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-full px-8 py-2 cursor-pointer"
              onClick={() => navigate("/question")}
            >
              View All Questions
            </button>
          </div>

          {/* Articles Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Articles</h2>
            <p className="text-gray-600 text-lg">
              Articles by {writer?.name || "the writer"}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-8">
            {loadingArticles ? (
              <div className="col-span-full flex justify-center py-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
              </div>
            ) : filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="article-card group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col cursor-pointer"
                  onClick={() =>
                    navigate(
                      `/detailarticle/${article.id}/${slugify(article.title)}`
                    )
                  }
                >
                  <div className="card-image-container relative h-[160px] w-full flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://api.minaramasjid.com/api/articles/image/${article.id}`}
                      alt={article.title}
                      className="card-image object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = sampleimg;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <div className="flex gap-2">
                        <button className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs backdrop-blur-sm font-medium hover:bg-black/75 transition-colors">
                          {isUrdu(article.title) ? "اردو" : "Roman"}
                        </button>
                        {article.translationLanguage && (
                          <button className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs backdrop-blur-sm font-medium gulzartext hover:bg-black/75 transition-colors">
                            {article.translationLanguage}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h2
                        className={`gulzartext card-title font-bold text-lg leading-tight ${isUrdu(article.title) ? "text-right" : "text-left"
                          }`}
                      >
                        {article.title}
                      </h2>
                    </div>
                  </div>
                  <div className="card-content-container p-4 flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="overflow-hidden">
                      <p
                        className="gulzartext line-clamp-2 text-sm text-black"
                        dangerouslySetInnerHTML={{
                          __html:
                            article.englishDescription ||
                            article.urduDescription,
                        }}
                      ></p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      {/* <p className="gulzartext text-xs font-medium text-slate-500 text-left mb-1">
                        {renderWriters(article.writers)}
                        {article.translator &&
                          ` ${article.writers?.length ? '| ' : ''}Translator: ${article.translator}`}
                      </p> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-slate-600">
                  No articles found for this writer
                </p>
              </div>
            )}
          </div>

          {filteredArticles.length > 4 && (
            <div className="text-center">
              <button
                className="cursor-pointer border border-gray-400 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-2"
                onClick={() => navigate("/articles")}
              >
                View All Articles
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
