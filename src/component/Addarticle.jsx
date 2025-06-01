import { Search, ChevronDown, Eye, Menu, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import bg from "../../public/images/newbg.png";
import Logo from "../../public/images/bg.png";
import { useNavigate } from "react-router-dom";

export default function ArticlesPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [writers, setWriters] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    writer: "",
    translator: "",
    language: "",
    sorting: "latest",
    topic: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [writerRes, translatorRes, languageRes, topicRes, articleRes] =
          await Promise.all([
            fetch("https://newmmdata-backend.onrender.com/api/writers"),
            fetch("https://newmmdata-backend.onrender.com/api/translators"),
            fetch(
              "https://newmmdata-backend.onrender.com/api/languages/language"
            ),
            fetch("https://newmmdata-backend.onrender.com/api/topics"),
            fetch("https://newmmdata-backend.onrender.com/api/articles"),
          ]);

        setWriters(await writerRes.json());
        setTranslators(await translatorRes.json());
        setLanguages(await languageRes.json());
        setTopics(await topicRes.json());
        setArticles(await articleRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredArticles = articles
    .filter((article) => {
      const { writer, translator, language, topic } = selectedFilters;
      return (
        (!writer || article.writers?.includes(writer)) &&
        (!translator || article.translator?.includes(translator)) &&
        (!language || article.language === language) &&
        (!topic || article.topic === topic)
      );
    })
    .sort((a, b) => {
      return selectedFilters.sorting === "latest"
        ? new Date(b.createdAt) - new Date(a.createdAt)
        : new Date(a.createdAt) - new Date(b.createdAt);
    });

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="loader mb-4"></div>
        <p className="gulzartext text-xl">لوڈ ہو رہا ہے...</p>

        {/* Loader Spinner CSS */}
        <style jsx>{`
          .loader {
            border: 4px solid #d3e7b1;
            border-top: 4px solid #718e56;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e4f0d0] relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

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

      <div className="relative z-10 container mx-auto px-4 py-8 mt-10">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Articles</h1>
          <p className="max-w-3xl mx-auto text-gray-700">
            Discover a wealth of Islamic knowledge, from insightful articles to
            in-depth research. Explore the rich heritage of Islam and gain a
            deeper understanding of its teachings and practices.
          </p>
        </header>

        <div className="gulzartext flex flex-wrap justify-center gap-2 mb-10">
          {topics.slice(0, 4).map((topic, index) => (
            <CategoryPill key={index} label={topic.topic} count={topic.id} />
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-6 text-black">
          <div className="w-full lg:w-80 bg-white rounded-lg p-5 h-fit">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="تلاش کریں"
                className="gulzartext w-full py-2 px-4 pr-10 border border-[#DADADA] rounded-full text-right"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <FilterDropdown
              label="Writer"
              value={selectedFilters.writer}
              options={writers.map((w) => w.name)}
              onChange={handleFilterChange}
            />
            <FilterDropdown
              label="Translator"
              value={selectedFilters.translator}
              options={translators.map((t) => t.name)}
              onChange={handleFilterChange}
            />
            <FilterDropdown
              label="Sorting"
              value={selectedFilters.sorting}
              options={["latest", "oldest"]}
              onChange={handleFilterChange}
            />
            <FilterDropdown
              label="Language"
              value={selectedFilters.language}
              options={languages.map((l) => l.language)}
              onChange={handleFilterChange}
            />
            <FilterDropdown
              label="Topic"
              value={selectedFilters.topic}
              options={topics.map((t) => t.topic)}
              onChange={handleFilterChange}
            />
          </div>

          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredArticles.map((article, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/detailarticle/${article.id}`)}
                >
                  <ArticleCard
                    backgroundImage={`https://newmmdata-backend.onrender.com/api/articles/image/${article.id}`}
                    titleEn={article.title}
                    titleAr={article.title}
                    englishDescription={article.urduDescription}
                    writers={article.writers}
                    translator={article.translator}
                    views={article.views}
                    type={article.type}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CategoryPill({ label, count }) {
  return (
    <div className="bg-[#d3e7b1] gulzartext px-4 py-2 rounded-full flex items-center gap-2 text-gray-800">
      <span className="gulzartext">{label}</span>
      <span className="bg-[#6b8e23] gulzartext text-white rounded-full px-2 py-0.5 text-sm">
        {count}
      </span>
    </div>
  );
}

const FilterDropdown = ({ label, value, options, onChange }) => {
  const filterKey = label.toLowerCase();
  return (
    <div className="mb-4 text-black">
      <label className="block mb-1 font-medium text-black gulzartext">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(filterKey, e.target.value)}
        className="w-full border border-[#DADADA] rounded-md p-2 text-black gulzartext"
      >
        <option value="">Select {label}</option>
        {options.map((option, idx) => (
          <option key={idx} value={option} className="text-black gulzartext">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

function ArticleCard({
  backgroundImage,
  titleEn,
  titleAr,
  englishDescription,
  writers,
  translator,
  views,
  type,
}) {
  const isRTL = (text) => /[\u0600-\u06FF]/.test(text);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-md cursor-pointer h-[380px] w-full flex flex-col">
      <div className="relative h-[200px] w-full">
        <img
          src={backgroundImage}
          alt={titleEn || titleAr}
          className="object-cover w-full h-full"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://minaramasjid.com/assets/image/default/articles.jpeg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/100 via-transparent to-transparent"></div>
        <div className="absolute top-3 left-3 right-3 flex justify-between">
          <div className="flex gap-1">
            <button className="bg-white text-black px-3 py-1 rounded-full text-sm opacity-[0.6]">
              Roman
            </button>
            <button className="bg-white gulzartext text-black px-3 py-1 rounded-full text-sm opacity-[0.6]">
              اردو
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
          <h2
            className={`gulzartext font-bold text-lg ${
              isRTL(titleEn) ? "text-right" : "text-left"
            }`}
          >
            {titleEn}
          </h2>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="overflow-hidden">
          <p
            className="gulzartext line-clamp-2 text-sm"
            dir={isRTL(englishDescription) ? "rtl" : "ltr"}
            dangerouslySetInnerHTML={{ __html: englishDescription }}
          />
        </div>

        <div className="flex flex-col gap-1">
          {type === "pattern" ? (
            <>
              <p className="gulzartext text-sm font-medium text-right">
                مصنف: مفتی فاروق مہایمی
              </p>
              <p className="gulzartext text-sm font-medium text-right">
                مترجم: فیض اشرفی
              </p>
            </>
          ) : (
            <>
              {writers &&
                writers.toLowerCase() !== "unknown" &&
                writers !== "2" &&
                isNaN(Number(writers)) && (
                  <p
                    className={`gulzartext text-sm font-medium ${
                      isRTL(writers) ? "text-right" : "text-left"
                    }`}
                  >
                    مصنف: {writers}
                  </p>
                )}

              {translator &&
                translator.toLowerCase() !== "unknown" &&
                translator !== "2" &&
                isNaN(Number(translator)) && (
                  <p
                    className={`gulzartext text-sm font-medium ${
                      isRTL(translator) ? "text-right" : "text-left"
                    }`}
                  >
                    مترجم: {translator}
                  </p>
                )}
            </>
          )}
        </div>

        <div className="flex justify-end items-center  gap-1">
          <Eye className="h-4 w-4 text-gray-600" />
          <span className="text-sm">{views}</span>
        </div>
      </div>
    </div>
  );
}
