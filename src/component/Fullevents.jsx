import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logo from "../../public/images/marclogo.png";
import bg from "../../public/images/bg.png";
import user from "../../public/images/user.png";
import Feedbackform from "../component/Feebackform";
import Sampleimg from "../../public/Sliderimage/sampleimg.jpeg";
import { Helmet } from "react-helmet"; // Add this import
import ShareButton from './ShareEventButton'


export default function Fullevents() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [article, setArticle] = useState(null);
  const [activeLanguage, setActiveLanguage] = useState("urdu");
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleArticle = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.minaramasjid.com/api/events/${id}`
        );
        const data = await res.json();
        setArticle(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching Article:", err);
        setLoading(false);
      }
    };

    if (id) fetchSingleArticle();
  }, [id]);

  const getActiveDescription = () => {
    switch (activeLanguage) {
      case "english":
        return article?.content || "No English description available.";
      case "urdu":
        return article?.content || "اردو تفصیل دستیاب نہیں ہے۔";
      case "roman":
        return article?.content || "No Roman description available.";
      default:
        return article?.content || "اردو تفصیل دستیاب نہیں ہے۔";
    }
  };

  if (loading || !article) {
    return <div className="text-center p-4">لوڈ ہو رہا ہے...</div>;
  }

  const imageUrl = `https://api.minaramasjid.com/api/events/image/${id}`;
  const pageUrl = window.location.href;
  const title = article?.title || "Event Details";
  const description = article?.content 
    ? article.content.substring(0, 160).replace(/<[^>]*>?/gm, '') 
    : "";

  return (
    <main className="min-h-screen bg-[#f0f5e9] bg-cover z-10">
     <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
      </Helmet>

      <div
        className="absolute inset-0 bg-cover bg-no-repeat opacity-70"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
       <header className="bg-white sticky  top-0 z-50 shadow-md border-b border-green-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4 relative">
                  <nav className="hidden md:flex gap-6 text-md font-semibold text-gray-700 tracking-wide">
                    <a href="/" className="hover:text-green-800">
                      Home
                    </a>
                    <a href="/about" className="hover:text-green-800">
                      About
                    </a>
                    <a href="/newsandevent" className="hover:text-green-800">
                      News & Event
                    </a>
                    <a href="/books" className="hover:text-green-800">
                      Books
                    </a>
                  </nav>
      
                  <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-16 h-16 rounded-full object-contain"
                    />
                  </div>
      
                  <nav className="hidden md:flex gap-6 text-md font-semibold text-gray-700 tracking-wide">
                    <a href="/article" className="hover:text-green-800">
                      Articles
                    </a>
                    <a href="/question" className="hover:text-green-800">
                      Question Answer
                    </a>
                    <a href="/requestbook" className="hover:text-green-800">
                      Request a Book
                    </a>
                    <a href="/contact" className="hover:text-green-800">
                      Contact
                    </a>
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
                  className={`md:hidden transition-all overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="flex flex-col gap-3 py-4 px-2 text-white bg-[#5a7544] rounded-b-xl">
                    <a href="/" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                      Home
                    </a>
                    <a href="/about" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                      About
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
      <div className="min-h-screen p-4 md:p-8 font-sans">
        <div className="max-w-4xl mx-auto mb-8 relative">
          {/* Image Container - Added above the title */}
          <div className="flex justify-center mb-6">
            <img
              src={`https://api.minaramasjid.com/api/events/image/${article.id}`}
              alt={article.title}
              className="w-[60%] h-[200px] object-cover rounded-xl"
            />
          </div>

          {/* Title Section */}
          <div className="text-center mb-8">
            <h1
              className="heading text-2xl md:text-3xl font-bold text-green-700 leading-relaxed"
              dir="rtl"
            >
              {article.title || "جشن میلاد مولا علی کرم اللہ وجہہ الکریم"}
            </h1>
          </div>

          {/* Main Content */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl">
            {/* Language Tabs */}
            <div className="flex mb-6 rounded-full overflow-hidden border border-[#d6e5c4]">
              <button
                onClick={() => setActiveLanguage("urdu")}
                className={`gulzartext flex-1 text-center py-2 font-medium ${
                  activeLanguage === "urdu"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                اردو
              </button>
              <button
                onClick={() => setActiveLanguage("roman")}
                className={`gulzartext flex-1 text-center py-2 font-medium ${
                  activeLanguage === "roman"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Roman
              </button>
              <button
                onClick={() => setActiveLanguage("english")}
                className={`gulzartext flex-1 text-center py-2 font-medium ${
                  activeLanguage === "english"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                English
              </button>
            </div>

            {/* Description */}
            <div
              className={`leading-loose text-gray-800 ${
                activeLanguage === "urdu" ? "text-right" : "text-left"
              }`}
              dir={activeLanguage === "urdu" ? "rtl" : "ltr"}
            >
              <div
                className="gulzartext prose max-w-none whitespace-pre-line"
                dangerouslySetInnerHTML={{ __html: getActiveDescription() }}
              />

              {/* Translator */}
              {article.translator &&
                isNaN(Number(article.translator.trim())) &&
                article.translator.trim().toLowerCase() !== "null" &&
                article.translator.trim() !== "" && (
                  <p
                    className={`gulzartext mt-4 text-sm font-semibold text-green-700 ${
                      /[\u0600-\u06FF]/.test(article.translator)
                        ? "text-right"
                        : "text-left"
                    }`}
                  >
                    {/[\u0600-\u06FF]/.test(article.translator)
                      ? `مترجم: ${article.translator}`
                      : `Translator: ${article.translator}`}
                  </p>
                )}

              <div className="flex justify-between mt-6">
                <button className="gulzartext bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                  مزید پڑھیں
                </button>
                <button className="gulzartext bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                  قرآنی آیات
                </button>
              </div>
            </div>
          </div>
        </div>

        <ShareButton type="newsandevent" id={article.id} title={article.slug} />

        <Feedbackform />
      </div>
    </main>
  );
}
