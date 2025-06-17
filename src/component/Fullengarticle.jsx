import React, { useState, useEffect  } from "react";
import { Search } from "lucide-react";
import logo from "../../public/images/marclogo.png";

import bg from "../../public/images/bg.png";
import Book from "../../public/images/book.png";
import user from "../../public/images/user.png";
import Articleimg1 from "../../public/Articlepage/article1.png";
import Articleimg2 from "../../public/Articlepage/article2.png";
import Articleimg3 from "../../public/Articlepage/article3.png";


export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const articleImages = [Articleimg1, Articleimg2, Articleimg3];
  const [articles, setArticles] = useState([]);
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleres = await fetch("https://api.awes.in/api/articles");
        const articleData = await articleres.json();
        setArticles(articleData);
        console.log("The Article Data: ", articleData);


        const writersres = await fetch("https://api.awes.in/api/writers");
        const writersData = await writersres.json();
        setWriters(writersData);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <main className="min-h-screen bg-[#f0f2e6] relative">
      {/* Navigation */}
      <header className="bg-[#718e56]  sticky top-0 mb-4 z-50  shadow-sm border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2 relative pb-2">
          <div className="flex justify-between items-center py-5">
            {/* Desktop Left Nav */}
            <nav className="hidden md:flex gap-6 text-md font-medium text-white">
              <a href="/" className="hover:text-gray-700">
                Home
              </a>
              <a href="/about" className="hover:text-gray-700">
                About Center
              </a>
              <a href="/books" className="hover:text-gray-700">
                Books
              </a>
              <a href="/gallery" className="hover:text-gray-700">
                Gallery
              </a>
            </nav>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-6 bg-white rounded-full p-1 shadow-md">
              <img
                src={logo}
                alt="Maula Ali Research Centre Logo"
                width={64}
                height={64}
                className="rounded-full object-contain"
              />
            </div>

            {/* Desktop Right Nav */}
            <nav className="hidden md:flex gap-6 text-sm font-medium text-white">
              <a href="/news" className="hover:text-gray-700">
                News
              </a>
              <a href="/article" className="hover:text-gray-700">
                Articles
              </a>
              <a href="/questions" className="hover:text-gray-700">
                Questions
              </a>
              <a href="/contact" className="hover:text-gray-700">
                Contact
              </a>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-800 focus:outline-none"
                aria-label="Toggle menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
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

          {/* Mobile Dropdown Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2 text-sm font-medium text-black">
              <a href="/" className="block hover:text-green-700">
                Home
              </a>
              <a href="/about" className="block hover:text-green-700">
                About Center
              </a>
              <a href="/books" className="block hover:text-green-700">
                Books
              </a>
              <a href="/gallery" className="block hover:text-green-700">
                Gallery
              </a>
              <a href="/news" className="block hover:text-green-700">
                News
              </a>
              <a href="/article" className="block hover:text-green-700">
                Articles
              </a>
              <a href="/questions" className="block hover:text-green-700">
                Questions
              </a>
              <a href="/contact" className="block hover:text-green-700">
                Contact
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Background Pattern */}
      <div
        className="relative z-40 w-full rounded-b-4xl -mt-8 overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex items-center justify-center mt-4 h-[200px] w-full bg-[#C0D7AA]/80 rounded-b-4xl">
          <h1 className="gulzartext text-3xl md:text-4xl font-bold text-[#4a7031] text-center rtl px-4">
          {articles[0]?.title}
          </h1>
        </div>
     




      {/* Author Info */}
      <div className="flex items-center mb-4 mr-8 ml-[90px] mt-4">
        <div className="w-12 h-12  bg-gray-100 rounded-full flex items-center justify-center border">
          <img src={user} alt="Author" width={40} height={40} />
        </div>
        <div className="ml-[15px]">
          <div className="text-xs text-gray-600">Writer</div>
          <h2 className="text-xl font-bold">{articles[0]?.writers}</h2>
        </div>
        <div className="ml-[500px] flex items-center text-xs text-gray-500">
          <svg className="w-4 h-4 text-[#6a8a4f] mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 3.5C5.305 3.5 1.403 6.833 0 10c1.403 3.167 5.305 6.5 10 6.5s8.597-3.333 10-6.5c-1.403-3.167-5.305-6.5-10-6.5zM10 15c-2.761 0-5-2.239-5-5s2.239-5 5-5 5 2.239 5 5-2.239 5-5 5z" />
            <circle cx="10" cy="10" r="2" />
          </svg>
          <span className="text-[#6a8a4f]">180</span>
        </div>
      </div>


      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12 relative z-10">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Article */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:w-2/3">
            {/* Language Tabs */}
            <div className="flex rounded-full overflow-hidden border border-[#d6e5c4] mb-6">
              <div className="gulzartext flex-1 bg-[#c1d9a3] text-center py-2 text-[#4a7031] cursor-pointer rtl">
                اردو
              </div>
              <div className="flex-1 bg-[#e8f0e0] text-center py-2 cursor-pointer">
                Roman
              </div>
              <div className="flex-1 bg-[#e8f0e0] text-center py-2 cursor-pointer">
                English
              </div>
            </div>



            {/* Article Content */}
            <div className="rtl text-right leading-relaxed space-y-4 cursor-pointer">
              <p className="gulzartext text-left">
              {articles[0]?.content}
              </p>
              {/* <p className="gulzartext text-left">

                Hazrat Qataada farmaate hain:
                Qalam Allaah ki bohot badi ni'mat hai, agar qalam na ho to deen qaaim na rahe.
                (Tafseer-e-Tabri, zair-e-aayat Al-Lazii 'Allama Bil-Qalam)
              </p>
              <p className="gulzartext text-left">

                Hazrat Qataada farmaate hain:
                Qalam Allaah ki bohot badi ni'mat hai, agar qalam na ho to deen qaaim na rahe.
                (Tafseer-e-Tabri, zair-e-aayat Al-Lazii 'Allama Bil-Qalam)
              </p> */}


            </div>

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

          {/* Sidebar */}
          <div className="md:w-1/3 space-y-4">
            {/* Book Cover */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src={Book}
                alt="Book Cover"
                className="w-full h-60 object-cover"
              />
            </div>

            {/* Featured Articles */}
            {articleImages.map((item, index) => (
              <div key={item} className="rounded-xl overflow-hidden bg-[#ecf1e1]">
                {/* Top Image with Overlay Text */}
                <div
                  className="h-28 bg-cover bg-center flex items-center justify-center text-white text-center font-bold text-lg gulzartext rtl"
                  style={{
                    backgroundImage: `url(${item})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                  }}
                >
                  آیاتِ قرآنی کی حیرت انگیز تاثیر کا ایک نمونہ
                </div>

                {/* Article Info */}
                <div className="p-4 space-y-1 rtl text-right font-sans">
                  <p className="text-[13px] text-gray-700 leading-snug">
                    Quran-e-Hakeem ki aayaat mein Khudaa-e-Qudduus ne bijli ki taaseer se bhi zyada hairat
                  </p>
                  <p className="text-[13px] text-gray-700 font-semibold">
                    Writer : Mufti Farooque Mahaimi
                  </p>
                  <p className="text-[13px] text-gray-700 font-semibold">
                    Mutarjim : Faiz Ashrafi
                  </p>

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
                    <span className="text-[#6a8a4f] ml-1">180</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>



        {/* Author Bio */}
        {/* Author Profile */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-xl p-6 shadow-sm mb-12">
            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
              <div className="flex-1 text-right order-2 md:order-1">
                <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2 rtl gulzartext">
                  اسلامک اسکالر
                </h1>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 rtl gulzartext">
                  مفتی فاروق مہائمی مصباحی
                </h2>
                <p className="text-sm md:text-base text-gray-700 leading-relaxed rtl gulzartext">
                {writers[6]?.urduDescription}
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
            <h2 className="font-bold text-2xl text-[#1f1f1f]">Writer Articals Highlights</h2>
            <a
              href="/article"
              className="bg-white border border-[#4a7031] text-[#4a7031] rounded-full px-4 py-1 text-sm font-medium hover:bg-[#eaf3df] transition"
            >
              View All Articles
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div key={index} className="rounded-xl overflow-hidden shadow-sm border border-gray-200">
                {/* Image with overlay */}
                <div className="relative h-48">
                  <img src={Articleimg1} alt="Article" fill className="object-cover h-full w-full" />

                  {/* Top-left Language tag */}
                  <div className="absolute top-2 left-2 bg-[#e8f0e0] rounded-full px-2 py-0.5 text-xs font-['Gulzar']">
                    مقالے
                  </div>

                  {/* Top-right Language buttons */}
                  <div className="absolute top-2 right-2 flex space-x-2 rtl:space-x-reverse">
                    <div className="bg-white rounded-full px-2 py-0.5 text-xs">Roman</div>
                    <div className="bg-white rounded-full px-2 py-0.5 text-xs">Urdu</div>
                  </div>

                  {/* Text Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-4">
                    <h3 className="font-['Gulzar'] font-bold text-white text-right rtl mb-1 text-lg leading-snug">
                      {index % 2 === 0 ? "آیات قرآنی کی حیرت انگیز" : "راز کی باتیں"}
                    </h3>
                    <h4 className="font-['Gulzar'] font-bold text-white text-right rtl text-sm">
                      {index % 2 === 0 ? "تاثیر کا ایک نمونہ" : "کامیابی کی حکمت"}
                    </h4>
                  </div>
                </div>

                {/* Card Bottom Content */}
                <div className="p-4">
                  <p className="font-['Gulzar'] text-xs text-right rtl text-gray-600 mb-1 leading-relaxed">
                    قرآن حکیم کی آیات میں خدا کی قدرت اور تاثیر کا بیان
                  </p>
                  <p className="font-['Gulzar'] text-xs text-right rtl text-gray-600 mb-1">
                    <span className="font-semibold">مصنف :</span> مفتی فاروق مہائمی
                  </p>
                  <p className="font-['Gulzar'] text-xs text-right rtl text-gray-600">
                    <span className="font-semibold">مترجم :</span> فیض اشرفی
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </main >
  )
}
