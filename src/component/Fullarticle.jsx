import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../public/images/marclogo.png";


import bg from "../../public/images/bg.png";
import Book from "../../public/images/book.png";
import user from "../../public/images/user.png";
import Articleimg1 from "../../public/Articlepage/article1.png";
import Articleimg2 from "../../public/Articlepage/article2.png";
import Articleimg3 from "../../public/Articlepage/article3.png";
import Feedbackform from "../component/Feebackform";
import Sampleimg from '../../public/Sliderimage/sampleimg.jpeg'

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [article, setArticle] = useState([]);
  const [activeLanguage, setActiveLanguage] = useState("urdu"); // Default to Urdu
  const [allarticle, setAllarticle] = useState([]);
  const articleImages = [Articleimg1, Articleimg2, Articleimg3];
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        setLoading(true); // Start loading
        const res = await fetch(
          `https://api.minaramasjid.com/api/articles/${id}`
        );
        const data = await res.json();
        setArticle(data);

        const articleres = await fetch(
          "https://api.minaramasjid.com/api/articles"
        );
        const resdata = await articleres.json();
        setAllarticle(resdata);
        
        setLoading(false); // Done loading
      } catch (err) {
        console.error("Error fetching Article:", err);
        setLoading(false);
      }
    };

    if (id) fetchSingleArticle();
  }, [id]);

  if (!article) {
    return <div className="text-center p-4">لوڈ ہو رہا ہے...</div>;
  }

  const getActiveDescription = () => {
    switch (activeLanguage) {
      case "english":
        return (
          article.englishDescription || "No English description available."
        );
      case "urdu":
        return article.urduDescription || "اردو تفصیل دستیاب نہیں ہے۔";
      case "roman":
        return article.englishDescription || "No Roman description available.";
      default:
        return article.urduDescription || "اردو تفصیل دستیاب نہیں ہے۔";
    }
  };

  const activeDescription = getActiveDescription();

  const formatDescription = (htmlString) => {
    if (!htmlString) return [];

    const cleanText = htmlString
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();

    return cleanText.split("\n").filter((line) => line.trim() !== "");
  };

  const sortedArticles = [...allarticle].sort((a, b) => b.views - a.views);
  const topArticles = sortedArticles.slice(0, 6); // Top 6
  const midArticles = sortedArticles.slice(6, 15);

  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-[#f0f5e9] bg-cover z-10">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${bg})`, backgroundPosition: "center" }}
      ></div>
      <header className="bg-[#718e56] sticky  top-0 z-50 shadow-md border-b border-green-100">
             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               <div className="flex justify-between items-center py-4 relative">
                 <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
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
     
                 <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
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
                     href="/newsandevent"
                     className="hover:bg-[#4f6639] px-4 py-2 rounded"
                   >
                     Books
                   </a>
                   <a href="/books" className="hover:bg-[#4f6639] px-4 py-2 rounded">
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

      {/* Background Pattern */}
      {/* Main Title */}
      <div
        className="relative z-40 w-full rounded-b-4xl -mt-8 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex items-center justify-center mt-4 h-[200px] w-full bg-[#C0D7AA]/80 rounded-b-4xl">
          <h1 className="gulzartext text-3xl md:text-4xl font-bold text-[#4a7031] text-center rtl px-4">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Author Profile */}
      <div className="flex items-center justify-end gap-4 mt-6 px-6 mr-6 sm:px-8 md:px-16 flex-wrap">
        <div className="text-right">
          <p className="text-sm text-gray-600 gulzartext mt-1">استاد اسکالر</p>
          <h2 className="font-extrabold text-xl text-[#4a7031] gulzartext">
            {article.writers || "مظہر حسین علیم"}
          </h2>
        </div>
        <img
          src={user}
          alt="Author"
          className="w-16 h-16 rounded-full border-2 border-[#6a8a4f]"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Main Content - moved first in DOM for mobile */}
        <div className="md:col-span-2 bg-white rounded-lg shadow-lg p-6 space-y-6 order-1 md:order-2">
          {/* Language Tabs */}
          <div className="flex rounded-full overflow-hidden border border-[#d6e5c4]">
            <button
              onClick={() => setActiveLanguage("urdu")}
              className={`gulzartext flex-1 text-center py-2 text-[#4a7031] cursor-pointer rtl ${
                activeLanguage === "urdu" ? "bg-[#c1d9a3]" : "bg-[#e8f0e0]"
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setActiveLanguage("roman")}
              className={`flex-1 text-center py-2 cursor-pointer ${
                activeLanguage === "roman" ? "bg-[#c1d9a3]" : "bg-[#e8f0e0]"
              }`}
            >
              Roman
            </button>
            <button
              onClick={() => setActiveLanguage("english")}
              className={`flex-1 text-center py-2 cursor-pointer ${
                activeLanguage === "english" ? "bg-[#c1d9a3]" : "bg-[#e8f0e0]"
              }`}
            >
              English
            </button>
          </div>

          {/* Article Content */}
          <div
            className={`leading-relaxed space-y-8 ${
              activeLanguage === "urdu" ? "rtl text-right" : "ltr text-left"
            }`}
          >
            <div
              className="prose max-w-none gulzartext"
              dangerouslySetInnerHTML={{ __html: activeDescription }}
            />
          </div>

          {/* Translator (only show if valid and not numeric) */}
          {article.translator &&
            isNaN(Number(article.translator.toString().trim())) &&
            article.translator.toString().trim().toLowerCase() !== "null" &&
            article.translator.toString().trim() !== "" &&
            (() => {
              const translator = article.translator.toString().trim();

              // Basic check for Urdu characters (Arabic Unicode range)
              const isUrdu = /[\u0600-\u06FF]/.test(translator);

              return (
                <p
                  className={`gulzartext text-[#4a7031] text-sm font-semibold ${
                    isUrdu ? "text-right" : "text-left"
                  }`}
                  dir={isUrdu ? "rtl" : "ltr"}
                >
                  {isUrdu
                    ? `مترجم : ${translator}`
                    : `Translator: ${translator}`}
                </p>
              );
            })()}

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button className="gulzartext bg-[#e8f0e0] text-[#4a7031] px-4 py-2 rounded-full text-sm">
              آگے پڑھیں
            </button>
            <button className="gulzartext bg-[#e8f0e0] text-[#4a7031] px-4 py-2 rounded-full text-sm">
              قرآنی آیات
            </button>
          </div>
        </div>

        {/* Left Sidebar - moved second in DOM for mobile */}
        <div className="md:col-span-1 space-y-6 order-2 md:order-1">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <img
              src={`https://api.minaramasjid.com/api/articles/image/${article.id}`}
              alt="Book Cover"
              className="w-full h-60 object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  Sampleimg;
              }}
            />
          </div>

          {[...allarticle]
            .sort((a, b) => b.views - a.views)
            .slice(0, 5)
            .map((item, index) => {
              const isValidName = (name) => {
                if (!name) return false;
                const lowerName = name.toString().toLowerCase().trim();
                return (
                  lowerName !== "unknown" &&
                  lowerName !== "2" &&
                  isNaN(Number(lowerName))
                );
              };

              // Language-specific labels and alignment classes
              const isUrdu = activeLanguage === "urdu";
              const writerLabel = isUrdu ? "مصنف" : "Writer";
              const translatorLabel = isUrdu ? "مترجم" : "Mutarjim";
              const alignmentClass = isUrdu ? "text-right" : "text-left";

              return (
                <div
                  key={index}
                  onClick={() => navigate(`/detailarticle/${item.id}`)}
                  className="rounded-xl overflow-hidden bg-[#ecf1e1] cursor-pointer"
                >
                  {/* Top Image with Overlay Text */}
                  <div className="relative h-28 overflow-hidden rounded-t-xl">
                    <img
                      src={`https://api.minaramasjid.com/api/articles/image/${item.id}`}
                      alt={item.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          Sampleimg;
                      }}
                    />
                    <div className="absolute inset-0 bg-black/30"></div>
                    <div className="relative z-10 flex items-center justify-center h-full text-white text-center font-bold text-lg gulzartext rtl">
                      {item.title}
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className={`p-4 space-y-1 rtl font-sans`}>
                    <p
                      className={`text-[13px] text-gray-700 leading-snug line-clamp-2 ${alignmentClass}`}
                    >
                      {item.englishDescription}
                    </p>

                    {isValidName(item.writers) && (
                      <p
                        className={`gulzartext text-[13px] text-gray-700 font-semibold ${alignmentClass}`}
                      >
                        {writerLabel} : {item.writers}
                      </p>
                    )}

                    {isValidName(item.translator) && (
                      <p
                        className={`text-[13px] text-gray-700 font-semibold ${alignmentClass}`}
                      >
                        {translatorLabel} : {item.translator}
                      </p>
                    )}

                    {/* View Count */}
                    <div className="bg-[#d6e5c4] rounded-full px-2 py-1 text-xs flex items-center w-fit mt-2">
                      <svg
                        className="w-4 h-4 text-[#6a8a4f] mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 3.5C5.305 3.5 1.403 6.833 0 10c1.403 3.167 5.305 6.5 10 6.5s8.597-3.333 10-6.5c-1.403-3.167-5.305-6.5-10-6.5zM10 15c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" />
                        <circle cx="10" cy="10" r="2" />
                      </svg>
                      <span className="text-[#6a8a4f] ml-1">{item.views}</span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Author Profile */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            <div className="flex-1 text-right order-2 md:order-1 rtl">
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2 gulzartext">
                اسلامک اسکالر
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 gulzartext">
                {article.writers || "مظہر حسین علیم"}
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed gulzartext">
                {article.writers || "مظہر حسین علیم"} ایک معروف اسلامی عالم، مدرس اور مصنف ہیں۔ آپ
                دینی خدمات میں نمایاں شہرت رکھتے ہیں۔ آپ کئی اسلامی تحقیقی کتب
                کے مصنف ہیں اور مختلف دینی اداروں سے وابستہ رہے ہیں۔ آپ نے
                اسلامی تعلیمات کو عام فہم انداز میں پیش کرنے کا کام کیا ہے۔ آپ
                کی تحریریں مختلف دینی رسائل میں شائع ہوتی رہتی ہیں۔ آپ نے مختلف
                مذہبی اور اخلاقی موضوعات پر تقاریر بھی کی ہیں اور آپ کی خدمات کو
                سراہا گیا ہے۔ آپ کو عوام میں خاصی مقبولیت حاصل ہے۔
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center">
                <img
                  src={user}
                  alt="Scholar Icon"
                  width={80}
                  height={80}
                  className="text-green-700"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Writer Articles Highlights */}
      <div className="relative z-10 container mx-auto px-4 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-bold text-2xl text-[#1f1f1f]">
            Writer Articals Highlights
          </h2>
          <a
            href="/article"
            className="bg-white border border-[#4a7031] text-[#4a7031] rounded-full px-4 py-1 text-sm font-medium hover:bg-[#eaf3df] transition"
          >
            View All Articles
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 cursor-pointer">
          {midArticles.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/detailarticle/${item.id}`)}
              className="rounded-xl overflow-hidden shadow-sm border border-gray-200"
            >
              <div className="relative h-48">
                <img
                  src={`https://api.minaramasjid.com/api/articles/image/${item.id}`}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      Sampleimg;
                  }}
                  alt="Article"
                  fill
                  className="object-cover h-full w-full"
                />

                {/* Show Tag only if it's valid */}
                {item.tags &&
                  !["unknown", "1", "2", ""].includes(
                    item.tags.toLowerCase()
                  ) && (
                    <div className="absolute top-2 left-2 bg-[#e8f0e0] rounded-full px-2 py-0.5 text-xs font-['Gulzar']">
                      {item.tags}
                    </div>
                  )}

                <div className="absolute top-2 right-2 flex space-x-2 rtl:space-x-reverse">
                  <div className="bg-white rounded-full px-2 py-0.5 text-xs">
                    Roman
                  </div>
                  <div className="bg-white rounded-full px-2 py-0.5 text-xs">
                    Urdu
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                  <h3 className="font-['Gulzar'] text-white rtl mb-1 text-lg leading-snug line-clamp-1">
                    {item.title}
                  </h3>
                  <h4 className="font-['Gulzar'] text-white text-right rtl text-sm line-clamp-1">
                    {item.englishDescription}
                  </h4>
                </div>
              </div>

              <div className="p-4">
                <p className="font-['Gulzar'] line-clamp-1 text-xs text-right rtl text-gray-600 mb-1 leading-relaxed">
                  {item.englishDescription}
                </p>

                {/* Show Writer only if valid */}
                {item.writers &&
                  !["unknown", "1", "2", ""].includes(
                    item.writers.toLowerCase()
                  ) && (
                    <p className="font-['Gulzar'] text-xs text-right rtl text-gray-600 mb-1 line-clamp-1">
                      <span className="font-semibold">مصنف :</span>{" "}
                      {item.writers}
                    </p>
                  )}

                {/* Show Translator only if valid */}
                {item.translator &&
                  !["unknown", "1", "2", ""].includes(
                    item.translator.toLowerCase()
                  ) && (
                    <p className="font-['Gulzar'] text-xs text-right rtl text-gray-600 line-clamp-1">
                      <span className="font-semibold">مترجم :</span>{" "}
                      {item.translator}
                    </p>
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Feedbackform />
    </main>
  );
}
