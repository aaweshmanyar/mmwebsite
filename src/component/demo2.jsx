import React, { useState, useEffect } from 'react';

const BookCollection = () => {
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    // Any initialization code can go here
  }, []);

  const setActiveButton = (activeMode) => {
    setViewMode(activeMode);
  };

  const applyGridView = () => {
    setActiveButton('grid');
  };

  const applyListView = () => {
    setActiveButton('list');
  };

  return (
    <div className="bg-slate-100 text-gray-700 antialiased">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
        {/* Hero Section */}
        <section className="py-12 mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700 mb-5">Explore Our Collection</h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto text-left sm:text-center">
            Discover rare manuscripts and insightful publications from the Maula Ali Research Centre.
          </p>
        </section>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-12">
          <input
            type="text"
            className="w-full bg-white py-4 pl-6 pr-12 rounded-full shadow-md text-base text-gray-700 placeholder-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none transition-shadow font-gulzar text-right"
            placeholder="تلاش کریں..."
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
            className="absolute right-5 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div>
            <label htmlFor="writer" className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
              Writer
            </label>
            <select
              id="writer"
              className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow text-left"
            >
              <option value="">All Writers</option>
              <option>Mazhar Husain Aleemi</option>
              <option>Tauhid Ahmad Tarablusi</option>
            </select>
          </div>
          <div>
            <label htmlFor="translator" className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
              Translator
            </label>
            <select
              id="translator"
              className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow text-left"
            >
              <option value="">All Translators</option>
              <option>Tauhid Ahmad Tarablusi</option>
              <option className="font-gulzar text-right">اویس رضوی صدیقی</option>
            </select>
          </div>
          <div>
            <label htmlFor="language" className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
              Language
            </label>
            <select
              id="language"
              className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow text-left"
            >
              <option value="">All Languages</option>
              <option value="اردو" className="font-gulzar text-right">
                اردو
              </option>
              <option value="عربی" className="font-gulzar text-right">
                عربی
              </option>
              <option value="English" className="text-left">
                English
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="sorting" className="text-sm text-green-700 font-semibold mb-1.5 block text-left">
              Sort By
            </label>
            <select
              id="sorting"
              className="w-full border-gray-300 rounded-lg px-4 py-2.5 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none shadow-sm transition-shadow text-left"
            >
              <option value="">Relevance</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* Layout Toggle */}
        <div className="flex justify-end items-center mb-8 space-x-3">
          <button
            id="gridViewBtn"
            onClick={applyGridView}
            className={`toggle-button p-2.5 rounded-full ${
              viewMode === 'grid' ? 'bg-green-600 text-white active' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
            title="Grid view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
            </svg>
          </button>
          <button
            id="listViewBtn"
            onClick={applyListView}
            className={`toggle-button p-2.5 rounded-full ${
              viewMode === 'list' ? 'bg-green-600 text-white active' : 'bg-white text-gray-500 hover:bg-gray-100'
            }`}
            title="List view"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>

        {/* Cards Container */}
        <div
          id="cardsContainer"
          className={`mb-10 ${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'
              : 'flex flex-col space-y-6'
          }`}
        >
          {/* Card 1: English Title */}
          <div
            className={`book-card card-hover-effect bg-white rounded-xl shadow-lg overflow-hidden ${
              viewMode === 'grid' ? 'flex flex-col' : 'sm:flex sm:max-h-40'
            }`}
          >
            <div className={viewMode === 'grid' ? 'card-image-wrapper h-64 w-full' : 'card-image-wrapper sm:w-36 flex-shrink-0 h-full'}>
              <img
                src="https://newmmdata-backend.onrender.com/api/books/cover/16"
                alt="Book Cover Sayyidul Istighfar"
                className={`card-image w-full h-full object-cover ${
                  viewMode === 'list' ? 'sm:rounded-l-xl sm:rounded-r-none' : ''
                }`}
              />
            </div>
            <div
              className={`card-content-wrapper ${
                viewMode === 'grid' ? 'p-5 flex flex-col flex-grow' : 'p-4 sm:p-3 flex flex-col flex-grow'
              }`}
            >
              <div className="flex-grow text-left">
                <h3 className="card-title text-green-700 text-lg sm:text-base font-semibold line-clamp-2 sm:line-clamp-3 mb-1.5 text-left">
                  Sayyidul Istighfar
                </h3>
                <p className="card-meta-label text-xs text-gray-500 mb-0.5 text-left">Writer</p>
                <p className="card-meta-value text-sm text-gray-600 truncate sm:line-clamp-1 mb-2.5 text-left">Jalaluddin</p>
                <div className="mb-4 text-left">
                  <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium font-gulzar">
                    عربی
                  </span>
                </div>
              </div>
              <div
                className={`card-actions mt-auto flex ${
                  viewMode === 'grid' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'
                } gap-2`}
              >
                <a rel="noopener noreferrer" href="/bookdetail/16" className="card-action-primary w-full sm:w-auto">
                  <button className="button-hover-effect button-primary bg-green-600 text-white w-full px-2.5 py-1 rounded-full flex items-center justify-center text-xs font-medium">
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 ml-1"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </a>
                <a
                  href="https://newmmdata-backend.onrender.com/api/books/attachment/16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-action-secondary w-full sm:w-auto"
                >
                  <button className="button-hover-effect button-secondary bg-amber-400 text-gray-800 w-full px-2.5 py-1 rounded-full flex items-center justify-center text-xs font-medium">
                    Download
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 ml-1"
                    >
                      <path d="M12 17V3"></path>
                      <path d="m6 11 6 6 6-6"></path>
                      <path d="M19 21H5"></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Urdu Title */}
          <div
            className={`book-card card-hover-effect bg-white rounded-xl shadow-lg overflow-hidden ${
              viewMode === 'grid' ? 'flex flex-col' : 'sm:flex sm:max-h-40'
            }`}
          >
            <div className={viewMode === 'grid' ? 'card-image-wrapper h-64 w-full' : 'card-image-wrapper sm:w-36 flex-shrink-0 h-full'}>
              <img
                src="https://newmmdata-backend.onrender.com/api/books/cover/23"
                alt="Book Cover پندرہویں صدی"
                className={`card-image w-full h-full object-cover ${
                  viewMode === 'list' ? 'sm:rounded-l-xl sm:rounded-r-none' : ''
                }`}
              />
            </div>
            <div
              className={`card-content-wrapper ${
                viewMode === 'grid' ? 'p-5 flex flex-col flex-grow' : 'p-4 sm:p-3 flex flex-col flex-grow'
              }`}
            >
              <div className="flex-grow text-right">
                <h3 className="card-title text-green-700 text-xl sm:text-lg font-semibold line-clamp-2 sm:line-clamp-3 mb-1.5 font-gulzar leading-snug md:leading-normal text-right">
                  پندرہویں صدی میں پھیلی ہندوستانی فقہ و افتا کی مختصر تاریخ
                </h3>
                <p className="card-meta-label text-xs text-gray-500 mb-0.5 text-left">Writer</p>
                <p className="card-meta-value text-sm text-gray-600 truncate sm:line-clamp-1 mb-2.5 text-left">
                  Mufti Farooque Mahaimi
                </p>
                <div className="mb-4 text-right">
                  <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-medium font-gulzar">
                    Urdu
                  </span>
                </div>
              </div>
              <div
                className={`card-actions mt-auto flex ${
                  viewMode === 'grid' ? 'flex-col sm:flex-row' : 'flex-col sm:flex-row'
                } gap-2`}
              >
                <a rel="noopener noreferrer" href="/bookdetail/23" className="card-action-primary w-full sm:w-auto">
                  <button className="button-hover-effect button-primary bg-green-600 text-white w-full px-2.5 py-1 rounded-full flex items-center justify-center text-xs font-medium">
                    Read More{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 ml-1"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </button>
                </a>
                <a
                  href="https://newmmdata-backend.onrender.com/api/books/attachment/23"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-action-secondary w-full sm:w-auto"
                >
                  <button className="button-hover-effect button-secondary bg-amber-400 text-gray-800 w-full px-2.5 py-1 rounded-full flex items-center justify-center text-xs font-medium">
                    Download{' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-3 w-3 ml-1"
                    >
                      <path d="M12 17V3"></path>
                      <path d="m6 11 6 6 6-6"></path>
                      <path d="M19 21H5"></path>
                    </svg>
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCollection;