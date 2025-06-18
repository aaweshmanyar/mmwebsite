import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Eye, Menu, X } from "lucide-react";
import Logo from "../../public/images/marclogo.png";
import Sampleimg from '../../public/Sliderimage/sampleimg.jpeg';

const ArticlesPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [writers, setWriters] = useState([]);
  const [translators, setTranslators] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [allArticles, setAllArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]); // Articles after filtering
  const [displayedArticles, setDisplayedArticles] = useState([]); // Articles currently displayed
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState({
    writer: "",
    translator: "",
    language: "",
    sorting: "latest",
    topic: "",
  });

  const navigate = useNavigate();
  const articlesPerLoad = 4; // Load 4 articles at a time

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [writerRes, translatorRes, languageRes, topicRes, articleRes] =
          await Promise.all([
            fetch("https://api.minaramasjid.com/api/writers"),
            fetch("https://api.minaramasjid.com/api/translators"),
            fetch("https://api.minaramasjid.com/api/languages/language"),
            fetch("https://api.minaramasjid.com/api/topics"),
            fetch("https://api.minaramasjid.com/api/articles"),
          ]);

        setWriters(await writerRes.json());
        setTranslators(await translatorRes.json());
        setLanguages(await languageRes.json());
        setTopics(await topicRes.json());
        const articlesData = await articleRes.json();
        setAllArticles(articlesData);
        setFilteredArticles(articlesData); // Initially set filtered articles to all articles
        // Initially load first 4 articles
        setDisplayedArticles(articlesData.slice(0, articlesPerLoad));
        setHasMore(articlesData.length > articlesPerLoad);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const loadMoreArticles = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;
    const startIndex = (nextPage - 1) * articlesPerLoad;
    const endIndex = startIndex + articlesPerLoad;

    setTimeout(() => {
      const newArticles = filteredArticles.slice(startIndex, endIndex);
      setDisplayedArticles(prev => [...prev, ...newArticles]);
      setPage(nextPage);
      setHasMore(endIndex < filteredArticles.length);
      setLoadingMore(false);
    }, 500); // Small delay for better UX
  }, [page, hasMore, loadingMore, filteredArticles]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        loadMoreArticles();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMoreArticles]);

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...selectedFilters,
      [filterType]: value,
    };
    
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = useCallback((filters) => {
    let filtered = [...allArticles];
    
    // Apply each filter if it has a value
    if (filters.writer) {
      filtered = filtered.filter(article => article.writers === filters.writer);
    }
    
    if (filters.translator) {
      filtered = filtered.filter(article => article.translator === filters.translator);
    }
    
    if (filters.language) {
      filtered = filtered.filter(article => article.language === filters.language);
    }
    
    if (filters.topic) {
      filtered = filtered.filter(article => article.topic === filters.topic);
    }
    
    // Apply sorting
    filtered = sortArticles(filtered, filters.sorting);
    
    // Update filtered articles
    setFilteredArticles(filtered);
    // Reset displayed articles with first page
    setDisplayedArticles(filtered.slice(0, articlesPerLoad));
    setPage(1);
    setHasMore(filtered.length > articlesPerLoad);
  }, [allArticles]);

  const sortArticles = (articles, sorting) => {
    return [...articles].sort((a, b) => {
      if (sorting === "latest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
    });
  };

  const resetFilters = () => {
    const resetFiltersState = {
      writer: "",
      translator: "",
      language: "",
      sorting: "latest",
      topic: "",
    };
    
    setSelectedFilters(resetFiltersState);
    setFilteredArticles(sortArticles(allArticles, "latest"));
    setPage(1);
    setDisplayedArticles(sortArticles(allArticles, "latest").slice(0, articlesPerLoad));
    setHasMore(allArticles.length > articlesPerLoad);
  };

  // Apply filters whenever selectedFilters changes
  useEffect(() => {
    applyFilters(selectedFilters);
  }, [selectedFilters, applyFilters]);

  useEffect(() => {
    const gridViewButton = document.getElementById("gridViewButton");
    const listViewButton = document.getElementById("listViewButton");
    const articlesContainer = document.getElementById("articlesContainer");
    const articleCards = articlesContainer?.querySelectorAll(".article-card");

    if (!articlesContainer || !articleCards) return;

    function setActiveButton(activeButton, inactiveButton) {
      activeButton.classList.remove("bg-slate-200", "text-slate-700");
      activeButton.classList.add("bg-emerald-600", "text-white");
      inactiveButton.classList.remove("bg-emerald-600", "text-white");
      inactiveButton.classList.add("bg-slate-200", "text-slate-700");
    }

    function switchToGridView() {
      articlesContainer.className =
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5";
      articleCards.forEach((card) => {
        card.classList.remove("md:flex-row", "h-auto", "max-w-full");
        card.classList.add("flex-col");

        const imageContainer = card.querySelector(".card-image-container");
        const contentContainer = card.querySelector(".card-content-container");
        const textDescription =
          contentContainer?.querySelector(".text-description");
        const cardTitle = card.querySelector(".card-title");

        imageContainer?.classList.remove(
          "md:w-48",
          "lg:w-60",
          "xl:w-72",
          "md:h-full"
        );
        imageContainer?.classList.add("h-[160px]", "w-full");

        const img = imageContainer?.querySelector(".card-image");
        img?.classList.remove("md:rounded-l-xl", "md:rounded-r-none");

        if (textDescription) {
          textDescription.classList.remove("line-clamp-list");
          textDescription.classList.add("line-clamp-2");
        }
        if (cardTitle) {
          cardTitle.classList.add("title-line-clamp-grid");
          cardTitle.classList.remove("line-clamp-none");
        }
      });
      setActiveButton(gridViewButton, listViewButton);
      localStorage.setItem("articleView", "grid");
    }

    function switchToListView() {
      articlesContainer.className = "flex flex-col gap-6";
      articleCards.forEach((card) => {
        card.classList.remove("flex-col");
        card.classList.add(
          "flex",
          "flex-col",
          "md:flex-row",
          "h-auto",
          "max-w-full"
        );

        const imageContainer = card.querySelector(".card-image-container");
        const contentContainer = card.querySelector(".card-content-container");
        const textDescription =
          contentContainer?.querySelector(".text-description");
        const cardTitle = card.querySelector(".card-title");

        imageContainer?.classList.remove("h-[160px]", "w-full");
        imageContainer?.classList.add(
          "w-full",
          "md:w-48",
          "lg:w-60",
          "xl:w-72",
          "md:h-[180px]",
          "flex-shrink-0"
        );

        const img = imageContainer?.querySelector(".card-image");
        img?.classList.add("md:rounded-l-xl", "md:rounded-r-none");

        if (textDescription) {
          textDescription.classList.add("line-clamp-2");
        }
        if (cardTitle) {
          cardTitle.classList.remove("title-line-clamp-grid");
          cardTitle.classList.add("line-clamp-2");
        }
      });

      setActiveButton(listViewButton, gridViewButton);
      localStorage.setItem("articleView", "list");
    }

    if (gridViewButton && listViewButton) {
      gridViewButton.addEventListener("click", switchToGridView);
      listViewButton.addEventListener("click", switchToListView);

      const savedView = localStorage.getItem("articleView");
      if (savedView === "list") {
        switchToListView();
      } else {
        switchToGridView();
      }

      return () => {
        gridViewButton.removeEventListener("click", switchToGridView);
        listViewButton.removeEventListener("click", switchToListView);
      };
    }
  }, [displayedArticles]);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-slate-100 space-y-6">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        <div className="amiri-regular  text-2xl text-emerald-700 font-semibold arabic-text">
          صَلَّى ٱللّٰهُ عَلَيْهِ وَآلِهِ وَسَلَّمَ
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-100">
      <header className="relative z-50 bg-[#718e56] text-white">
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex items-center justify-between relative">
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

          <nav className="hidden md:flex items-center space-x-6 text-[15px] font-medium">
            <a href="/" className="hover:text-amber-300">Home</a>
            <a href="/about" className="hover:text-amber-300">About</a>
            <a href="/newsandevent" className="hover:text-amber-300">News & Events</a>
            <a href="/books" className="hover:text-amber-300">Books</a>
          </nav>

          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 z-30 bg-white rounded-full p-1 shadow-md">
            <img
              src={Logo}
              alt="Logo"
              className="w-20 h-20 object-contain rounded-full"
            />
          </div>

          <div className="hidden md:flex items-center space-x-5 font-medium text-[15px]">
            <a href="/article" className="hover:text-amber-300">Articles</a>
            <a href="/question" className="hover:text-amber-300">Question Answer</a>
            <a href="/requestbook" className="hover:text-amber-300">Request a Book</a>
            <a href="/contact" className="hover:text-amber-300">Contact</a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 flex">
            <div
              className="fixed inset-0 bg-black bg-opacity-30"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="relative w-1/2 h-full bg-[#718e56] p-4 space-y-4 text-[15px] font-medium z-50">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 text-white"
              >
                <X className="w-5 h-5" />
              </button>
              <a href="/" className="block hover:text-white">Home</a>
              <a href="/about" className="block hover:text-white">About</a>
              <a href="/newsandevent" className="block hover:text-white">News & Events</a>
              <a href="/books" className="block hover:text-white">Books</a>
              <a href="/article" className="block hover:text-white">Articles</a>
              <a href="/question" className="block hover:text-white">Question Answer</a>
              <a href="/requestbook" className="block hover:text-white">Request a Book</a>
              <a href="/contact" className="block hover:text-white">Contact</a>
              <div className="flex items-center bg-white rounded-full px-3 py-1 mt-2 w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="cursor-pointer bg-transparent outline-none text-black text-sm w-full"
                />
                <Search className="w-4 h-4 text-black ml-2" />
              </div>
            </div>
          </div>
        )}
      </header>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 gulzartext mt-10">
            مضامین
          </h1>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Articles
          </h1>
          <p className="max-w-3xl mx-auto text-slate-600 text-base md:text-lg">
            Discover a wealth of Islamic knowledge, from insightful articles to
            in-depth research. Explore the rich heritage of Islam and gain a
            deeper understanding of its teachings and practices.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <div
            className="bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2 text-emerald-700 shadow-sm hover:bg-emerald-200 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
            onClick={resetFilters}
          >
            <span className="serif font-medium">All</span>
            <span className="bg-emerald-600 text-white rounded-full px-2.5 py-0.5 text-xs font-semibold">
              {allArticles.length}
            </span>
          </div>

          {topics.slice(0, 2).map((topic) => (
            <div
              key={topic._id}
              className="bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2 text-emerald-700 shadow-sm hover:bg-emerald-200 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              onClick={() => handleFilterChange("topic", topic.topic)}
            >
              <span className="gulzartext font-medium">{topic.topic}</span>
              <span className="bg-emerald-600 text-white rounded-full px-2.5 py-0.5 text-xs font-semibold">
                {allArticles.filter((a) => a.topic === topic.topic).length}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col overflow-hidden lg:flex-row gap-8">
          <aside className="w-full lg:w-64 bg-white rounded-xl shadow-lg p-5 h-fit sticky top-8 flex-shrink-0">
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="تلاش کریں"
                className="cursor-pointer gulzartext bg-slate-50 w-full py-2 px-3 pr-10 border border-slate-300 rounded-full text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-right"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-search absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">
                  Writer
                </label>
                <div className="relative">
                  <select
                    className="cursor-pointer appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.writer}
                    onChange={(e) => handleFilterChange("writer", e.target.value)}
                  >
                    <option value="">Select Writer</option>
                    {writers.map((writer) => (
                      <option key={writer._id} value={writer.name}>
                        {writer.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">
                  Translator
                </label>
                <div className="relative">
                  <select
                    className="cursor-pointer appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.translator}
                    onChange={(e) => handleFilterChange("translator", e.target.value)}
                  >
                    <option value="">Select Translator</option>
                    {translators.map((translator) => (
                      <option key={translator._id} value={translator.name}>
                        {translator.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">
                  Sorting
                </label>
                <div className="relative">
                  <select
                    className="cursor-pointer appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.sorting}
                    onChange={(e) => handleFilterChange("sorting", e.target.value)}
                  >
                    <option value="latest">Latest</option>
                    <option value="oldest">Oldest</option>
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">
                  Language
                </label>
                <div className="relative">
                  <select
                    className="cursor-pointer appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.language}
                    onChange={(e) => handleFilterChange("language", e.target.value)}
                  >
                    <option value="">Select Language</option>
                    {languages.map((language) => (
                      <option key={language._id} value={language.language}>
                        {language.language}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">
                  Topic
                </label>
                <div className="relative">
                  <select
                    className="appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.topic}
                    onChange={(e) => handleFilterChange("topic", e.target.value)}
                  >
                    <option value="">Select Topic</option>
                    {topics.map((topic) => (
                      <option key={topic._id} value={topic.topic}>
                        {topic.topic}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-700" />
                </div>
              </div>
            </div>
          </aside>

          <main className="flex-1">
            <div className="flex justify-end items-center mb-6 space-x-2 mt-6">
              <span className="text-sm font-medium text-slate-700">View:</span>
              <button
                id="gridViewButton"
                type="button"
                className="cursor-pointer p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                aria-label="Grid View"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <rect width="7" height="7" x="3" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="3" rx="1" />
                  <rect width="7" height="7" x="14" y="14" rx="1" />
                  <rect width="7" height="7" x="3" y="14" rx="1" />
                </svg>
              </button>
              <button
                id="listViewButton"
                type="button"
                className="cursor-pointer p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors"
                aria-label="List View"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <line x1="8" x2="21" y1="6" y2="6" />
                  <line x1="8" x2="21" y1="12" y2="12" />
                  <line x1="8" x2="21" y1="18" y2="18" />
                  <line x1="3" x2="3.01" y1="6" y2="6" />
                  <line x1="3" x2="3.01" y1="12" y2="12" />
                  <line x1="3" x2="3.01" y1="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              id="articlesContainer"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {displayedArticles.map((article) => (
                <div
                  key={article._id}
                  className="article-card group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col cursor-pointer"
                  onClick={() => navigate(`/detailarticle/${article.id}`)}
                >
                  <div className="card-image-container relative h-[160px] w-full flex-shrink-0 overflow-hidden">
                    <img
                      src={`https://api.minaramasjid.com/api/articles/image/${article.id}` || Sampleimg}
                      alt={article.title}
                      className="card-image object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = Sampleimg;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <div className="flex gap-2">
                        <button className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs backdrop-blur-sm font-medium hover:bg-black/75 transition-colors">
                          {/[؀-ۿ]/.test(article.title) ? 'اردو' : 'Roman'}
                        </button>
                        {article.translationLanguage && (
                          <button className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs backdrop-blur-sm font-medium gulzartext hover:bg-black/75 transition-colors">
                            {article.translationLanguage}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                      <h2 className="gulzartext card-title font-bold text-lg leading-tight title-line-clamp-2">
                        {article.title}
                      </h2>
                    </div>
                  </div>
                  <div className="card-content-container p-4 flex-1 flex flex-col justify-between overflow-hidden">
                    <div className="overflow-hidden">
                      <p
                        className="gulzartext text-description line-clamp-2 text-sm text-slate-600"
                        dangerouslySetInnerHTML={{
                          __html: article.englishDescription || article.urduDescription,
                        }}
                      ></p>
                    </div>
                    <div className="mt-3 pt-3 border-t border-slate-200">
                      <p className="gulzartext text-xs font-medium text-slate-500 text-left mb-1">
                        {article.author && `Author: ${article.author}`}
                        {article.translator && ` | Translator: ${article.translator}`}
                      </p>
                      <div className="flex justify-end items-center gap-1 text-slate-500">
                        <Eye className="h-4 w-4" />
                        <span className="text-xs">{article.views || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {loadingMore && (
                <div className="col-span-full flex justify-center py-6">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              )}
              
              {!hasMore && displayedArticles.length > 0 && (
                <div className="col-span-full text-center py-6 text-slate-500">
                  No more articles to load
                </div>
              )}
              
              {displayedArticles.length === 0 && !loading && (
                <div className="col-span-full text-center py-10">
                  <p className="text-slate-600">
                    No articles found matching your filters
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;