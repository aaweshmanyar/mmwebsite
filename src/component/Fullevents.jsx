import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../../public/images/marclogo.png";
import bg from "../../public/images/bg.png";
import user from "../../public/images/user.png";
import Feedbackform from "../component/Feebackform";

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
        return (
          article?.englishDescription || "No English description available."
        );
      case "urdu":
        return article?.urduDescription || "اردو تفصیل دستیاب نہیں ہے۔";
      case "roman":
        return article?.englishDescription || "No Roman description available.";
      default:
        return article?.urduDescription || "اردو تفصیل دستیاب نہیں ہے۔";
    }
  };

  if (loading || !article) {
    return <div className="text-center p-4">لوڈ ہو رہا ہے...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-green-200 p-4 md:p-8 font-sans">
      <div className="max-w-4xl mx-auto mb-8 relative">
        {/* Header */}
        <div className="flex justify-center mb-6">
          {article.image && (
            <img
              src={`https://api.minaramasjid.com/api/events/image/${article.id}`}
              alt="Event"
              className="rounded-2xl shadow-lg max-h-64 w-full object-cover"
            />
          )}
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1
            className="text-2xl md:text-3xl font-bold text-green-700 leading-relaxed"
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
              className={`flex-1 text-center py-2 font-medium ${
                activeLanguage === "urdu"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setActiveLanguage("roman")}
              className={`flex-1 text-center py-2 font-medium ${
                activeLanguage === "roman"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Roman
            </button>
            <button
              onClick={() => setActiveLanguage("english")}
              className={`flex-1 text-center py-2 font-medium ${
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
            <div className="prose max-w-none whitespace-pre-line">
              {getActiveDescription()}
            </div>

            {/* Translator */}
            {article.translator &&
              isNaN(Number(article.translator.trim())) &&
              article.translator.trim().toLowerCase() !== "null" &&
              article.translator.trim() !== "" && (
                <p
                  className={`mt-4 text-sm font-semibold text-green-700 ${
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
              <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                مزید پڑھیں
              </button>
              <button className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                قرآنی آیات
              </button>
            </div>
          </div>
        </div>
      </div>
      <Feedbackform />
    </div>
  );
}
