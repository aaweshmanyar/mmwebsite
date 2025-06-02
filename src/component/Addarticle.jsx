import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Eye, Menu, X } from "lucide-react";
import Logo from "../../public/images/marclogo.png";


const ArticlesPage = () => {
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
            fetch("https://newmmdata-backend.onrender.com/api/languages/language"),
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

  useEffect(() => {
    const gridViewButton = document.getElementById('gridViewButton');
    const listViewButton = document.getElementById('listViewButton');
    const articlesContainer = document.getElementById('articlesContainer');
    const articleCards = articlesContainer?.querySelectorAll('.article-card');

    if (!articlesContainer || !articleCards) return;

    function setActiveButton(activeButton, inactiveButton) {
      activeButton.classList.remove('bg-slate-200', 'text-slate-700');
      activeButton.classList.add('bg-emerald-600', 'text-white');
      inactiveButton.classList.remove('bg-emerald-600', 'text-white');
      inactiveButton.classList.add('bg-slate-200', 'text-slate-700');
    }

    function switchToGridView() {
      articlesContainer.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5';
      articleCards.forEach(card => {
        card.classList.remove('md:flex-row', 'h-auto', 'max-w-full');
        card.classList.add('flex-col');
        
        const imageContainer = card.querySelector('.card-image-container');
        const contentContainer = card.querySelector('.card-content-container');
        const textDescription = contentContainer?.querySelector('.text-description');
        const cardTitle = card.querySelector('.card-title');

        imageContainer?.classList.remove('md:w-48', 'lg:w-60', 'xl:w-72', 'md:h-full');
        imageContainer?.classList.add('h-[160px]', 'w-full');
        
        const img = imageContainer?.querySelector('.card-image');
        img?.classList.remove('md:rounded-l-xl', 'md:rounded-r-none');

        if (textDescription) {
          textDescription.classList.remove('line-clamp-list');
          textDescription.classList.add('line-clamp-2');
        }
        if(cardTitle) {
          cardTitle.classList.add('title-line-clamp-grid');
          cardTitle.classList.remove('line-clamp-none');
        }
      });
      setActiveButton(gridViewButton, listViewButton);
      localStorage.setItem('articleView', 'grid');
    }

    function switchToListView() {
      articlesContainer.className = 'flex flex-col gap-6';
      articleCards.forEach(card => {
        card.classList.remove('flex-col');
        card.classList.add('md:flex-row', 'h-auto', 'max-w-full');
        
        const imageContainer = card.querySelector('.card-image-container');
        const contentContainer = card.querySelector('.card-content-container ');
        const textDescription = contentContainer?.querySelector('.text-description' );
        const cardTitle = card.querySelector('.card-title');

        imageContainer?.classList.remove('h-[160px]', 'w-full');
        imageContainer?.classList.add('md:w-48', 'lg:w-60', 'xl:w-72', 'md:h-auto', 'flex-shrink-0');
        imageContainer.style.height = '';
        
        const img = imageContainer?.querySelector('.card-image');
        img?.classList.add('md:rounded-l-xl', 'md:rounded-r-none');
        
        if (textDescription) {
          textDescription.classList.remove('line-clamp-2');
          textDescription.classList.add('line-clamp-2');
        }
        if(cardTitle) {
          cardTitle.classList.remove('title-line-clamp-grid');
          cardTitle.classList.add('line-clamp-2');
        }
      });
      setActiveButton(listViewButton, gridViewButton);
      localStorage.setItem('articleView', 'list');
    }

    if (gridViewButton && listViewButton) {
      gridViewButton.addEventListener('click', switchToGridView);
      listViewButton.addEventListener('click', switchToListView);

      const savedView = localStorage.getItem('articleView');
      if (savedView === 'list') {
        switchToListView();
      } else {
        switchToGridView();
      }

      return () => {
        gridViewButton.removeEventListener('click', switchToGridView);
        listViewButton.removeEventListener('click', switchToListView);
      };
    }
  }, [articles]); // Add articles as dependency to re-run when articles change

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  // Filter articles based on selected filters
  const filteredArticles = articles.filter(article => {
    return (
      (selectedFilters.writer === "" || article.writer === selectedFilters.writer) &&
      (selectedFilters.translator === "" || article.translator === selectedFilters.translator) &&
      (selectedFilters.language === "" || article.language === selectedFilters.language) &&
      (selectedFilters.topic === "" || article.topic === selectedFilters.topic)
    );
  });

  // Sort articles based on selected sorting
  const sortedArticles = [...filteredArticles].sort((a, b) => {
    if (selectedFilters.sorting === "latest") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  return (
    <div className="bg-slate-100">
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

      <div className="relative z-10 container mx-auto px-4 py-8 ">
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 gulzartext mt-10">مضامین</h1>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">Articles</h1>
          <p className="max-w-3xl mx-auto text-slate-600 text-base md:text-lg">
            Discover a wealth of Islamic knowledge, from insightful articles to in-depth research. Explore the rich heritage of Islam and gain a deeper understanding of its teachings and practices.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {topics.slice(0,4).map(topic => (
            <div 
              key={topic._id} 
              className="bg-emerald-100 px-4 py-2 rounded-full flex items-center gap-2 text-emerald-700 shadow-sm hover:bg-emerald-200 hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              onClick={() => handleFilterChange('topic', topic.topic)}
            >
              <span className="gulzartext font-medium">{topic.topic}</span>
              <span className="bg-emerald-600 text-white rounded-full px-2.5 py-0.5 text-xs font-semibold">
                {articles.filter(a => a.topic === topic.topic).length}
              </span>
            </div>
          ))}
        </div>

        <div className="flex flex-col overflow-hidden lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white rounded-xl shadow-lg p-5 h-fit sticky top-8 flex-shrink-0">
            <div className="relative mb-6">
              <input 
                type="text" 
                placeholder="تلاش کریں" 
                className="gulzartext bg-slate-50 w-full py-2 px-3 pr-10 border border-slate-300 rounded-full text-slate-700 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-right" 
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">Writer</label>
                <div className="relative">
                  <select 
                    className="appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.writer}
                    onChange={(e) => handleFilterChange('writer', e.target.value)}
                  >
                    <option value="">Select Writer</option>
                    {writers.map(writer => (
                      <option key={writer._id} value={writer.name} className="cursor-pointer text-slate-700 gulzartext">
                        {writer.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">Translator</label>
                <div className="relative">
                  <select 
                    className="appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.translator}
                    onChange={(e) => handleFilterChange('translator', e.target.value)}
                  >
                    <option value="">Select Translator</option>
                    {translators.map(translator => (
                      <option key={translator._id} value={translator.name} className="cursor-pointer text-slate-700 gulzartext">
                        {translator.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">Sorting</label>
                <div className="relative">
                  <select 
                    className="appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.sorting}
                    onChange={(e) => handleFilterChange('sorting', e.target.value)}
                  >
                    <option value="latest" className="cursor-pointer text-slate-700 gulzartext">Latest</option>
                    <option value="oldest" className="cursor-pointer text-slate-700 gulzartext">Oldest</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">Language</label>
                <div className="relative">
                  <select 
                    className="appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.language}
                    onChange={(e) => handleFilterChange('language', e.target.value)}
                  >
                    <option value="">Select Language</option>
                    {languages.map(language => (
                      <option  key={language._id} value={language.language} className="cursor-pointer text-slate-700 gulzartext">
                        {language.language}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium text-slate-700 gulzartext text-sm">Topic</label>
                <div className="relative">
                  <select 
                    className="appearance-none bg-slate-50 w-full border border-slate-300 rounded-md py-2 px-3 text-slate-700 gulzartext focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                    value={selectedFilters.topic}
                    onChange={(e) => handleFilterChange('topic', e.target.value)}
                  >
                    <option value="">Select Topic</option>
                    {topics.map(topic => (
                      <option key={topic._id} value={topic.topic} className="text-slate-700 gulzartext">
                        {topic.topic}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1">
            {/* Layout Toggle */}
            <div className="flex justify-end items-center mb-6 space-x-2">
              <span className="text-sm font-medium text-slate-700">View:</span>
              <button id="gridViewButton" type="button" className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors" aria-label="Grid View">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
              </button>
              <button id="listViewButton" type="button" className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors" aria-label="List View">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><line x1="8" x2="21" y1="6" y2="6"/><line x1="8" x2="21" y1="12" y2="12"/><line x1="8" x2="21" y1="18" y2="18"/><line x1="3" x2="3.01" y1="6" y2="6"/><line x1="3" x2="3.01" y1="12" y2="12"/><line x1="3" x2="3.01" y1="18" y2="18"/></svg>
              </button>
            </div>

            {/* Articles Container */}
            <div id="articlesContainer" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {sortedArticles.length > 0 ? (
                sortedArticles.map(article => (
                  <div key={article._id} className="article-card group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out flex flex-col cursor-pointer">
                    <div className="card-image-container relative h-[160px] w-full flex-shrink-0 overflow-hidden">
                      <img 
                        src={article.image || "https://minaramasjid.com/assets/image/default/articles.jpeg"} 
                        alt={article.title} 
                        dir={article.language === 'English' ? 'ltr' : 'rtl'}
                        className="card-image object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 ease-in-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <div className="flex gap-2">
                          <button className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs backdrop-blur-sm font-medium hover:bg-black/75 transition-colors">
                            {article.language}
                          </button>
                          {article.translationLanguage && (
                            <button className="bg-black/50 text-white px-2.5 py-1 rounded-full text-xs backdrop-blur-sm font-medium gulzartext hover:bg-black/75 transition-colors">
                              {article.translationLanguage}
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                        <h2 className="gulzartext card-title font-bold text-lg leading-tight title-line-clamp-2" dir={article.language === 'English' ? 'ltr' : 'rtl'}>
                          {article.title}
                        </h2>
                      </div>
                    </div>
                    <div className="card-content-container p-4 flex-1 flex flex-col justify-between overflow-hidden">
                      <div className="overflow-hidden">
                        <p className="gulzartext text-description line-clamp-2 text-sm text-slate-600" dir={article.language === 'English' ? 'ltr' : 'rtl'} dangerouslySetInnerHTML={{ __html: article.englishDescription || article.urduDescription }}>
                          
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-200">
                        <p className="gulzartext text-xs font-medium text-slate-500 text-left mb-1">
                          {article.writer && `Author: ${article.author}`}
                          {article.translator && ` | Translator: ${article.translator}`}
                        </p>
                        <div className="flex justify-end items-center gap-1 text-slate-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-eye h-4 w-4">
                            <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          <span className="text-xs">{article.views || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-slate-600">No articles found matching your filters</p>
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