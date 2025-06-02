import React, { useState, useEffect } from 'react';

const EnhancedUIDesign = () => {
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    // Load saved view mode from localStorage
    const savedViewMode = localStorage.getItem('viewMode');
    if (savedViewMode === 'list') {
      setViewMode('list');
    } else {
      setViewMode('grid');
    }
  }, []);

  const setGridView = () => {
    setViewMode('grid');
    localStorage.setItem('viewMode', 'grid');
  };

  const setListView = () => {
    setViewMode('list');
    localStorage.setItem('viewMode', 'list');
  };

  const cardsData = [
    {
      id: 1,
      text: "یہ ایک ایسا اسلامی تحقیقی مرکز ہے جو اسلام کے بنیادی اصولوں اور جدید دور کے چیلنجوں کے درمیان ہم آہنگی پیدا کرنے پر توجہ مرکوز کرتا ہے۔ ہماری تحقیق کا مقصد اسلامی تعلیمات کی روشنی میں موجودہ مسائل کے حل تلاش کرنا ہے جسے ہمارے اسکالرز بحسن و خوبی انجام دے رہے ہیں",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 2,
      text: "Aayaat-e-Quraani Ki Hairat Angez Taaseer Ka Ek Namuuna. This is a slightly longer line to test how the line clamping works effectively.",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 3,
      text: "یہ ایک ایسا اسلامی تحقیقی مرکز ہے جو اسلام کے بنیادی اصولوں اور جدید دور کے چیلنجوں کے درمیان ہم آہنگی پیدا کرنے پر توجہ مرکوز کرتا ہے۔ ہماری تحقیق کا مقصد اسلامی تعلیمات کی روشنی میں موجودہ مسائل کے حل تلاش کرنا ہے جسے ہمارے اسکالرز بحسن و خوبی انجام دے رہے ہیں۔",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 4,
      text: "تعلیمات اسلام کی ضرورت",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 5,
      text: "Waariseen mein beewi ek beta aur do betiyaa.n hain?.....",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 6,
      text: "Agar 'aurat khula' ka mutaalba kare?",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 7,
      text: "raj'at ke alfaaz",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 8,
      text: "Baap ke diye hue paise se ghar khareeda to kya is ghar mein deegar waariseen ka haq hoga?",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 9,
      text: "Kya khaala zaad bhai ki ladki se nikaah hosakta hai?",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 10,
      text: "Shauhar ne apni beewi se ye kaha, \"mein tujhe talaaq deta hu.n\"",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 11,
      text: "Apni zindagi mein bacho ke darmiyaan jaidaad kaise taqseem kare.n",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 12,
      text: "Apni zindagi mein apni jaidaad taqseem karne ki ek suurat.",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 13,
      text: "اپنی زندگی میں بچوں کے درمیان جائداد کیسے تقسیم کریں۔",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 14,
      text: "شوہر نے اپنی بیوی سے یہ کہا  میں تجھے طلاق دیتا ہوں",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 15,
      text: "کیا خالہ زاد بھائی کی لڑکی سے نکاح ہوسکتا ہے؟",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 16,
      text: "woh zewaraat jo meher ke",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 17,
      text: "Baap ke inteqaal se pehle beti ka inteqaal hogaya....",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 18,
      text: "Kya ek gawaah aur ek wakeel ki maujuudgi mein nikaah hoga?",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 19,
      text: "kya namaaz padhne ke liye di hui jagah bech sakte hain?",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 20,
      text: "pehle namaaz padhne ko zameen di baa",
      dir: "ltr",
      isUrdu: false
    },
    {
      id: 21,
      text: "کیاایک گواہ اور ایک وکیل کی موجودگی میں نکاح ہوگا",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 22,
      text: "باپ کے دیے ہوئے پیسے سے گھر خریدا، تو کیا اس گھر میں دیگر وارثین کا حق ہوگا؟",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 23,
      text: "وہ زیورات جو مہر کے علاوہ ، شوہر کے والدین دیتے بیوی کو دیتے ہیں، اس پر کس کا حق ہوتا ہے؟",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 24,
      text: "اگرعورت خلع کا مطالبہ کرے؟",
      dir: "rtl",
      isUrdu: true
    },
    {
      id: 25,
      text: "رجعت کے الفاظ",
      dir: "rtl",
      isUrdu: true
    }
  ];

  return (
    <div className="bg-slate-50 text-slate-800">
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header: Search and Filters */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 px-2 md:px-4">
          {/* Search Input */}
          <div className="relative w-full md:w-2/5 lg:w-1/3">
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search h-5 w-5 text-slate-400" aria-hidden="true">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              type="text"
              className="font-nastaliq block w-full rounded-full bg-white border border-slate-300 py-2.5 px-4 text-right pr-12 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none text-sm placeholder-slate-400"
              placeholder="تلاش کریں"
              value=""
            />
          </div>

          {/* Filter Buttons & Layout Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
            {/* Sort By Dropdown */}
            <div className="relative">
              <div className="flex flex-col">
                <label htmlFor="sort-by" className="text-xs text-slate-600 mb-1 font-nastaliq">ترتیب</label>
                <button id="sort-by" className="flex items-center justify-between gap-2 bg-white border border-slate-300 rounded-md px-3 py-1.5 w-40 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <span className="text-slate-700">Latest</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 text-slate-500" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
            {/* Language Dropdown */}
            <div className="relative">
              <div className="flex flex-col">
                <label htmlFor="language-filter" className="text-xs text-slate-600 mb-1 font-nastaliq">زبان</label>
                <button id="language-filter" className="flex items-center justify-between gap-2 bg-white border border-slate-300 rounded-md px-3 py-1.5 w-40 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                  <span className="font-nastaliq text-slate-700">Urdu</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 text-slate-500" aria-hidden="true">
                    <path d="m6 9 6 6 6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
            {/* Layout Toggle Buttons */}
            <div className="relative sm:mt-[1.35rem]">
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-md border border-slate-200">
                <button
                  id="listToggleBtn"
                  title="List View"
                  onClick={setListView}
                  className={`p-1.5 rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${viewMode === 'list' ? 'layout-toggle-active bg-emerald-500 text-white hover:bg-emerald-600' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list">
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3.01" y1="6" y2="6" />
                    <line x1="3" x2="3.01" y1="12" y2="12" />
                    <line x1="3" x2="3.01" y1="18" y2="18" />
                  </svg>
                </button>
                <button
                  id="gridToggleBtn"
                  title="Grid View"
                  onClick={setGridView}
                  className={`p-1.5 rounded-md text-slate-500 hover:bg-white hover:text-emerald-600 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 ${viewMode === 'grid' ? 'layout-toggle-active bg-emerald-500 text-white hover:bg-emerald-600' : ''}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-layout-grid">
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Section Title */}
        <div className="flex justify-start mb-6 px-2 md:px-4">
          <h2 className="font-nastaliq bg-emerald-100 text-emerald-700 rounded-full px-5 py-2 text-base font-semibold">سوالات کی فہرست</h2>
        </div>

        {/* Grid/List for Question Cards */}
        <main
          id="cardsContainer"
          className={`w-full px-2 md:px-4 ${viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 gap-5' : 'flex flex-col gap-3'}`}
        >
          {cardsData.map((card) => (
            <div
              key={card.id}
              className={`card-item bg-white rounded-xl shadow-lg p-5 flex cursor-pointer w-full transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 ${
                viewMode === 'list' ? 'flex-row items-center' : 'flex-col'
              }`}
            >
              <div className={`card-tag-section flex justify-end items-start ${viewMode === 'list' ? 'mb-0 ml-4 flex-shrink-0' : 'mb-3'}`}>
                <div className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-medium flex items-center gap-1.5 self-start">
                  <span className="font-nastaliq">سوال</span>
                  <span className="bg-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-semibold text-emerald-700">
                    {card.id}
                  </span>
                </div>
              </div>
              <div className={`card-content-section ${viewMode === 'list' ? 'flex-grow mb-0 text-right' : 'flex-grow mb-4'}`}>
                <p
                  className={`${viewMode === 'list' ? 'line-clamp-1 mb-2' : 'line-clamp-2'} ${
                    card.dir === 'rtl' ? 'text-right font-nastaliq' : 'text-left'
                  } text-slate-700 text-base leading-relaxed`}
                  dir={card.dir}
                >
                  {card.text}
                </p>
              </div>
              <div className={`card-actions-section flex justify-end gap-2 ${viewMode === 'list' ? 'mt-0 mr-auto flex-shrink-0' : 'mt-auto'}`}>
                <button className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors">
                  Roman
                </button>
                <button className="cursor-pointer font-nastaliq bg-slate-100 hover:bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors">
                  اردو
                </button>
              </div>
            </div>
          ))}
        </main>
      </div>

      <style jsx global>{`
        body {
          font-family: 'Inter', sans-serif;
          background-color: #f8fafc; /* bg-slate-50 */
        }
        .font-nastaliq {
          font-family: 'Noto Nastaliq Urdu', serif;
        }
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        /* Active state for toggle buttons */
        .layout-toggle-active {
          background-color: #10b981; /* bg-emerald-500 */
          color: white;
        }
        .layout-toggle-active:hover {
          background-color: #059669; /* bg-emerald-600 */
        }
      `}</style>
    </div>
  );
};

export default EnhancedUIDesign;