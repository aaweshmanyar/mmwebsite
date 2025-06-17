import React, { useState, useEffect } from "react";
import bg from "../../public/images/bg.png";
import user from "../../public/images/user.png";
import logo from "../../public/images/marclogo.png";
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [question, setQuestion] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const questionres = await fetch(
          "https://api.awes.in/api/questions"
        );
        const questionData = await questionres.json();
        setQuestion(questionData);
        console.log("The Article Data: ", questionData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const question19 = question.find((q) => q.id === 4);
  console.log("The question19 id data", question19);

  const formatDescription = (htmlString) => {
    return htmlString
      .replace(/<\/?[^>]+(>|$)/g, "") // remove HTML tags
      .replace(/&nbsp;/g, " ") // replace &nbsp; with space
      .replace(/<br\s*\/?>/gi, "\n"); // convert <br> to line breaks
  };

  return (
    <main className="min-h-screen bg-[#f0f2e6] relative">
      {/* Navigation */}
      <header className="bg-[#718e56] sticky top-0 z-50 shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            {/* Left Menu */}
            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a
                href="/"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Home
              </a>
              <a
                href="/about"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                About Center
              </a>
              <a
                href="/books"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Books
              </a>
              <a
                href="/gallery"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Gallery
              </a>
            </nav>

            {/* Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 rounded-full object-contain"
              />
            </div>

            {/* Right Menu */}
            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a
                href="/news"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                News
              </a>
              <a
                href="/article"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Articles
              </a>
              <a
                href="/question"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Questions
              </a>
              <a
                href="/contact"
                className="hover:text-yellow-200 transition-all duration-200"
              >
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
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

          {/* Mobile Dropdown */}
          <div
            className={`md:hidden transform transition-all duration-300 ease-in-out overflow-hidden ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-4 px-2 text-white font-medium tracking-wide text-base bg-[#5a7544] rounded-b-xl">
              <a href="/" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                Home
              </a>
              <a href="/about" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                About Center
              </a>
              <a href="/books" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                Books
              </a>
              <a
                href="/gallery"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Gallery
              </a>
              <a href="/news" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                News
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
                Questions
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
      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>

      {/* Banner Section */}
      <div
        className="relative z-40 w-full overflow-hidden bg-cover bg-center rounded-b-[3rem]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex flex-col items-center justify-center py-10 px-6 w-full bg-[#C0D7AA]/80">
          <h1 className="gulzartext mt-2 text-3xl md:text-4xl font-bold text-[#4a7031] text-center rtl mb-3">
            دار الإفتاء ریسرچ سینٹر سوال و جوابات تحقیقات
          </h1>
          <p className="gulzartext text-base md:text-lg font-medium text-[#4a7031] text-center rtl leading-relaxed">
            یہ ایک ایسا اسلامی تحقیقی مرکز ہے جو اسلام کے بنیادی اصولوں اور جدید
            دور کے چیلنجوں کے درمیان ہم آہنگی پیدا کرنے پر توجہ مرکوز کرتا ہے۔
            ہماری تحقیق کا مقصد اسلامی تعلیمات کی روشنی میں موجودہ مسائل کے حل
            تلاش کرنا ہے۔ ہمارے اسکالرز مختلف ممالک سے تعلق رکھتے ہیں۔
          </p>
        </div>
      </div>

      {/* Question Card */}

      {question19 && (
        <div
          key={question19._id}
          className="rounded-xl max-w-6xl mx-auto mt-8 p-6 md:p-8 border border-green-200"
        >
          <div className="flex items-center justify-end gap-2 mb-4 ltr">
            <h2 className="text-[#4a7031] text-xl font-extrabold gulzartext">
              سوال نمبر
            </h2>
            <span className="bg-[#C0D7AA] text-[#4a7031] font-bold rounded-full px-3 py-1 text-sm">
              {question19.id || 19}
            </span>
          </div>
          <p className="text-[#4a7031] text-lg gulzartext mb-6 leading-loose text-center">
            {question19.slug}
          </p>
        </div>
      )}

      {/* Author Profile */}
      <div className="flex flex-col items-end gap-2 mt-4 md:mb-16 mr-6 sm:mr-8 md:mr-16 px-4 sm:px-8 md:px-16 text-right">
        {/* Profile Image and Name */}
        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div>
            <p className="text-sm text-gray-600 gulzartext">اسلامک اسکالر</p>
            <h2 className="font-extrabold text-xl text-[#4a7031] gulzartext">
              مفتی فاروق مہمانی
            </h2>
          </div>
          <img
            src={user}
            alt="Author"
            className="w-16 h-16 rounded-full border-2 border-[#6a8a4f]"
          />
        </div>

        {/* Aljawab Text */}
        <div className="text-[#4a7031] text-lg font-bold gulzartext flex items-center gap-2 sm:-mb-24">
          الجواب
        </div>
      </div>

      {/* Tags & Answer Label */}
      <div className="flex flex-wrap items-center justify-between ml-[420px] sm:px-8 md:px-16 mt-6">
        <div className="flex gap-2 flex-wrap">
          <button className="bg-[#718e56] text-white text-sm px-4 py-1 mr-4 rounded-full gulzartext">
            قرآن کی تعلیمات
          </button>
          <button className="bg-[#718e56] text-white text-sm px-4 py-1 rounded-full gulzartext">
            نماز
          </button>
        </div>
      </div>

      {/* Question Listing  */}

      <div className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
          {/* Right content area - Answer details */}
          {question19 && (
            <div
              key={question19._id}
              className="w-full md:w-3/4 bg-white rounded-xl shadow-sm p-6 order-1 md:order-2"
            >
              <div className="rtl text-right leading-loose text-[#4a7031] text-lg gulzartext whitespace-pre-wrap">
                {question19.slug}
              </div>
            </div>
          )}

          {/* Left sidebar - Questions list */}
          <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm overflow-hidden border border-green-100 order-2 md:order-1">
            <div className="text-black p-4 text-center">
              <h2 className="text-2xl font-bold border-b border-black pb-2 gulzartext">
                دیگر سوالات
              </h2>
            </div>

            <div className="p-4 flex flex-col gap-4 rtl cursor-pointer">
              {question.slice(0, 5).map((q, index) => (
                <div
                  key={index}
                  onClick={() => navigate(`/question/${q.id || index}`)}
                  className="border-b border-green-200 pb-4 last:border-b-0 cursor-pointer"
                >
                  {/* Question number */}
                  <div className="flex justify-end mb-2">
                    <span className="bg-[#5a8c3c] text-white rounded-full px-3 py-1 text-sm cursor-pointer">
                      سوال نمبر {q.number || index + 1}
                    </span>
                  </div>
                  {/* Question Text */}
                  <p className="text-right text-gray-700 leading-relaxed text-base gulzartext cursor-pointer line-clamp-2">
                    {q.slug}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Author Profile */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-12 w-[900px] max-w-full mx-auto lg:ml-[390px] lg:mx-0">
          <div className="flex flex-col items-end gap-6 text-right">
            {/* Profile Image */}
            <div className="self-end">
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

            {/* Scholar Details */}
            <div className="flex-1 rtl">
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2 gulzartext">
                اسلامک اسکالر
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 gulzartext">
                مفتی فاروق مہائمی مصباحی
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed gulzartext">
                مفتی فاروق مہائمی ایک معروف اسلامی عالم، مدرس اور مصنف ہیں۔ آپ
                دینی خدمات میں نمایاں شہرت رکھتے ہیں۔ آپ کئی اسلامی تحقیقی کتب
                کے مصنف ہیں اور مختلف دینی اداروں سے وابستہ رہے ہیں۔ آپ نے
                اسلامی تعلیمات کو عام فہم انداز میں پیش کرنے کا کام کیا ہے۔ آپ
                کی تحریریں مختلف دینی رسائل میں شائع ہوتی رہتی ہیں۔ آپ نے مختلف
                مذہبی اور اخلاقی موضوعات پر تقاریر بھی کی ہیں اور آپ کی خدمات کو
                سراہا گیا ہے۔ آپ کو عوام میں خاصی مقبولیت حاصل ہے۔
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* More Questions */}

      <div className="bg-[#eaf3df] py-10">
        <div className="container mx-auto px-4">
          {/* Heading */}
          <h2 className="text-right font-bold text-2xl text-[#1f1f1f] mb-6 font-['Gulzar']">
            متعلق سوالات
          </h2>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 rtl">
            {question.slice(0, 5).map((q, index) => (
              <div key={index} className="bg-[#eaf3df] rounded-xl p-4  ">
                {/* Question number badge */}
                <div className="flex justify-end mb-3">
                  <span className="bg-[#5a8c3c] text-white rounded-full px-3 py-0.5 text-sm font-['Gulzar']">
                    سوال نمبر {q.id || index + 1}
                  </span>
                </div>

                {/* Question Text */}
                <p className="text-right text-[#1f1f1f] font-['Gulzar'] text-base leading-relaxed gulzartext">
                  {q.slug}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Question;