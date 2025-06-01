import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar/Navbar";
import { ChevronRight, Eye, User } from "lucide-react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bg from "../../public/images/newbg.png";
import image from "../../public/images/image 2.png";
import Banner from "../../public/images/banner.png";
import about from "../../public/images/about.jpg";
import Book from "../../public/images/book.png";
import Bookimg from "../../public/Aboutimg/bookclm.png";
import News1 from "../../public/News&Event/bookevent.png";
import News2 from "../../public/News&Event/islamicprogram.png";
import News3 from "../../public/News&Event/jashnemaulaali.png";
import News4 from "../../public/News&Event/newbook.png";
import Book1 from "../../public/OurBooks/book1.png";
import Book2 from "../../public/OurBooks/book2.png";
import Book3 from "../../public/OurBooks/book3.png";
import Book4 from "../../public/OurBooks/book4.png";
import Articleimg1 from "../../public/Article/article1.png";
import Articleimg2 from "../../public/Article/article2.png";
import Articleimg3 from "../../public/Article/article3.png";
import Articleimg4 from "../../public/Article/article4.png";
import Articleimg5 from "../../public/Article/article5.png";
import Articleimg6 from "../../public/Article/article6.png";
import Articleimg7 from "../../public/Article/article7.png";
import Articleimg8 from "../../public/Article/article8.png";
import Articleimg9 from "../../public/Article/article9.png";
import Articleimg10 from "../../public/Article/article10.png";
import Userimg from "../../public/Scholar/user.png";
import { useSearchParams, useNavigate } from "react-router-dom";

const banners = [Banner];
const BannerCarousel = () => {};
export default function Home() {
  const [articles, setArticles] = useState([]);
  const [writer, setWriter] = useState([]);
  const [book, setBook] = useState([]);
  const [event, setEvent] = useState([]);
  const scrollRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesRes = await fetch(
          "https://newmmdata-backend.onrender.com/api/articles"
        );
        const articlesData = await articlesRes.json();
        setArticles(articlesData);

        const writerRes = await fetch(
          "https://newmmdata-backend.onrender.com/api/writers"
        );
        const writerData = await writerRes.json();
        setWriter(writerData);

        const Bookres = await fetch(
          "https://newmmdata-backend.onrender.com/api/books"
        );
        const BookData = await Bookres.json();
        setBook(BookData);

        const Eventres = await fetch(
          "https://newmmdata-backend.onrender.com/api/events"
        );
        const EventData = await Eventres.json();
        setEvent(EventData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const [language, setLanguage] = useState("en");

  const isUrdu = language === "ur";

  const navigate = useNavigate();

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.offsetWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  // ✅ Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (scrollLeft >= maxScrollLeft) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({
          left: container.offsetWidth,
          behavior: "smooth",
        });
      }
    }, 8000);

    return () => clearInterval(interval);
  }, []);


  const images = [
  Banner,
  "https://minaramasjid.com/assets/image/slider/slider4.jpg",
  "https://minaramasjid.com/assets/image/slider/slider3.jpg",
];

const [order, setOrder] = useState([0, 1, 2]);

const handleClick = (index) => {
  if (index === order[1]) return; // Already center, do nothing

  // Swap clicked image with center
  const newOrder = [...order];
  const clickedIndex = newOrder.indexOf(index);
  [newOrder[1], newOrder[clickedIndex]] = [newOrder[clickedIndex], newOrder[1]];
  setOrder(newOrder);
};

// Auto slide every 3 seconds
useEffect(() => {
  const interval = setInterval(() => {
    // Rotate images to the left (next image becomes center)
    setOrder((prevOrder) => {
      const newOrder = [...prevOrder];
      // Rotate left: first element to end
      newOrder.push(newOrder.shift());
      return newOrder;
    });
  }, 3000);

  return () => clearInterval(interval); // Clear on unmount
}, []);

  return (
    <main
      className="min-h-screen  bg-opacity-80  bg-repeat "
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: "#f5f3e6",
        backgroundBlendMode: "overlay",
      }}
    >
      <Navbar />
      {/* Banner */}
     <div className="w-full py-6 px-4 flex justify-center items-center">
      <div className="w-full max-w-[1440px] flex justify-center items-center gap-4 md:gap-8">

        {/* Left Box */}
        <div
          className="hidden md:flex w-[300px] h-[200px] bg-white rounded-2xl shadow-md bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${images[order[0]]})` }}
          onClick={() => handleClick(order[0])}
        ></div>

        {/* Center Carousel */}
        <div className="w-full md:w-auto max-w-[800px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
             onClick={() => handleClick(order[1])}>
          <img
            src={images[order[1]]}
            alt="Center Banner"
            className="w-full h-[200px] md:h-[300px] object-cover rounded-xl"
          />
        </div>

        {/* Right Box */}
        <div
          className="hidden md:flex w-[300px] h-[200px] bg-white rounded-2xl shadow-md bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${images[order[2]]})` }}
          onClick={() => handleClick(order[2])}
        ></div>

      </div>
    </div>

      {/* About Sections */}

      <section className="w-full py-10 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Language Switch */}
          <div className="flex justify-end mb-6 gap-2">
            <button
              onClick={() => setLanguage("ur")}
              className={`gulzartext px-3 py-1 rounded-full text-sm cursor-pointer ${
                isUrdu ? "bg-[#e8f0d9] text-black" : "bg-white"
              }`}
            >
              اردو
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-3 py-1 rounded-full text-sm cursor-pointer ${
                !isUrdu ? "bg-[#e8f0d9] text-black" : "bg-white"
              }`}
            >
              English
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: Image Top, Text Bottom */}
            <div className="flex flex-col gap-4">
              <div className="bg-white rounded-xl p-2 shadow-md">
                <img
                  src={about}
                  alt="Minara Masjid"
                  className="w-full h-auto object-contain rounded-md"
                />
              </div>
              <div className="bg-gradient-to-b from-[#fff] rounded-xl shadow-lg p-6">
                <h3
                  className={`gulzartext text-orange-600 font-semibold mb-1 ${
                    isUrdu && "text-right"
                  }`}
                >
                  {isUrdu ? "تعارف" : "About"}
                </h3>
                <h2
                  className={`gulzartext text-2xl font-bold text-gray-800 mb-3 ${
                    isUrdu && "text-right"
                  }`}
                >
                  {isUrdu ? "منارہ مسجد ٹرسٹ" : "Minara Masjid Trust"}
                </h2>
                <p
                  className={`gulzartext text-gray-700 mb-4 ${
                    isUrdu ? "text-right" : "text-justify"
                  }`}
                >
                  {isUrdu
                    ? "مولا علی ریسرچ سینٹر کا مقصد پرانی اسلامیات حاصل کرنا ہے۔ کے مخطوطات (تشریحات، تفسیریں، تفسیر، وغیرہ) دنیا بھر کی لائبریریوں سے ہمارے آباؤ اجداد نے جو نہیں کیا ہے۔ شائع ہوا؛ شائع ہونے کی صورت میں وہ مزید قابل رسائی نہیں رہیں گے، وغیرہ اور جدید معیارات کے مطابق اس کی اشاعت پر کام کریں۔ عربی اور فارسی رسم الخط پر تحقیق کرکے، حوالہ دینا، متعدد زبانوں میں آسان ترجمہ، بنیادی طور پر انگریزی، ہندی اور اردو، اور آخر میں، پرنٹنگ اور ڈسٹری بیوشن یہ اسکالرز، ریسرچ ماہرین، دانشوروں اور پوری امت مسلمہ۔"
                    : "Maula Ali Research Centre aims to acquire old Islamic manuscripts (Interpretations, Commentaries, Exegesis, etc.) of our ancestors from libraries across the world which have not been published; if published, they are no longer accessible, etc. and work upon its publication according to modern standards by carrying out research on the Arabic and Persian scripts, referencing, easy translation into multiple languages, mainly English, Hindi and Urdu, and lastly, printing and distributing it amongst the scholars, research experts, intellectuals and the entire Muslim Ummah."}
                </p>
                <a
                  href="/about"
                  className={`text-green-700 hover:underline inline-flex items-center font-medium ${
                    isUrdu ? "justify-end w-full" : ""
                  }`}
                >
                  {isUrdu ? "مزید پڑھیں" : "Read More"}{" "}
                  <ChevronRight
                    className={`h-4 w-4 ml-1 ${isUrdu ? "rotate-180" : ""}`}
                  />
                </a>
              </div>
            </div>

            {/* Card 2: Text Top, Image Bottom */}
            <div className="flex flex-col gap-4">
              <div className="bg-gradient-to-b from-[#fff] rounded-xl shadow-lg p-6">
                <h3
                  className={`gulzartext text-orange-600 font-semibold mb-1 ${
                    isUrdu && "text-right"
                  }`}
                >
                  {isUrdu ? "تعارف" : "About"}
                </h3>
                <h2
                  className={`gulzartext text-2xl font-bold text-gray-800 mb-3 ${
                    isUrdu && "text-right"
                  }`}
                >
                  {isUrdu
                    ? "مولا علی ریسرچ سینٹر"
                    : "Maula Ali Research Centre"}
                </h2>
                <p
                  className={`gulzartext text-gray-700 mb-4 ${
                    isUrdu ? "text-right" : "text-justify"
                  }`}
                >
                  {isUrdu
                    ? "مولا علی ریسرچ سینٹر کا مقصد پرانی اسلامیات حاصل کرنا ہے۔ کے مخطوطات (تشریحات، تفسیریں، تفسیر، وغیرہ) دنیا بھر کی لائبریریوں سے ہمارے آباؤ اجداد نے جو نہیں کیا ہے۔ شائع ہوا؛ شائع ہونے کی صورت میں وہ مزید قابل رسائی نہیں رہیں گے، وغیرہ اور جدید معیارات کے مطابق اس کی اشاعت پر کام کریں۔ عربی اور فارسی رسم الخط پر تحقیق کرکے، حوالہ دینا، متعدد زبانوں میں آسان ترجمہ، بنیادی طور پر انگریزی، ہندی اور اردو، اور آخر میں، پرنٹنگ اور ڈسٹری بیوشن یہ اسکالرز، ریسرچ ماہرین، دانشوروں اور پوری امت مسلمہ۔"
                    : "Maula Ali Research Centre aims to acquire old Islamic manuscripts (Interpretations, Commentaries, Exegesis, etc.) of our ancestors from libraries across the world which have not been published; if published, they are no longer accessible, etc. and work upon its publication according to modern standards by carrying out research on the Arabic and Persian scripts, referencing, easy translation into multiple languages, mainly English, Hindi and Urdu, and lastly, printing and distributing it amongst the scholars, research experts, intellectuals and the entire Muslim Ummah."}
                </p>
                <a
                  href="/about"
                  className={`text-green-700 hover:underline inline-flex items-center font-medium ${
                    isUrdu ? "justify-end w-full" : ""
                  }`}
                >
                  {isUrdu ? "مزید پڑھیں" : "Read More"}{" "}
                  <ChevronRight
                    className={`h-4 w-4 ml-1 ${isUrdu ? "rotate-180" : ""}`}
                  />
                </a>
              </div>
              <div className="bg-white rounded-xl p-2 shadow-md">
                <img
                  src={Bookimg}
                  alt="Research Centre Library"
                  className="w-full h-auto object-contain rounded-md"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <a
              href="/about"
              className="px-8 py-2 bg-white shadow-md border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition"
            >
              Know More
            </a>
          </div>
        </div>
      </section>

      {/* News & Events */}
      <section className="w-full py-10 px-4  cursor-pointer">
        <div className="max-w-7xl mx-auto bg-gradient-to-b from-white rounded-3xl shadow-md px-6 py-8 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-green-800">
              News & Events
            </h2>
          </div>

          {/* Manual Arrows */}
          <div className="absolute left-4 top-[50%] -translate-y-1/2 z-10 ">
            <button
              onClick={() => scroll("left")}
              className="bg-[#e2f0d0] rounded-full p-2 hover:bg-[#d2e3bc] transition"
            >
              <ChevronRight className="h-5 w-5 text-green-700 rotate-180 cursor-pointer" />
            </button>
          </div>
          <div className="absolute right-4 top-[50%] -translate-y-1/2 z-10">
            <button
              onClick={() => scroll("right")}
              className="bg-[#e2f0d0] rounded-full p-2 hover:bg-[#d2e3bc] transition"
            >
              <ChevronRight className="h-5 w-5 text-green-700 cursor-pointer" />
            </button>
          </div>

          {/* Scrollable Cards Row */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 scroll-smooth hide-scrollbar cursor-pointer"
          >
            {event.map((event, idx) => (
              <div
                key={idx}
                className="w-[90%] sm:w-[47%] md:w-[47%] lg:w-[23%] mb-2 ml-10 flex-shrink-0 bg-gradient-to-b from-[#f6fbf1] rounded-2xl p-4 shadow-md"
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={`https://newmmdata-backend.onrender.com/api/events/image/${event.id}`}
                    alt={event.title}
                    className="w-full h-[160px] object-cover rounded-xl"
                  />
                </div>
                <h3 className="gulzartext text-green-800 text-lg font-bold mb-1 ">
                  {event.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4 gulzartext line-clamp-1">
                  {event.content}
                </p>
                <div className="flex justify-between items-center">
                  <a
                    href="/article"
                    className="flex items-center text-sm text-yellow-700 bg-yellow-50 px-3 py-1.5 rounded-full hover:bg-yellow-100 transition"
                  >
                    Read More
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                  <span className="text-sm text-gray-500">
                    View {event.views}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-8">
            <a
              href="/newsandevent"
              className="px-8 py-2 bg-white shadow-md border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition"
            >
              View All
            </a>
          </div>
        </div>
      </section>

      {/* Our Books */}
      <section className="w-full py-10 px-4 relative overflow-hidden">
        {/* Painted Background Effects */}
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white opacity-30 blur-3xl rounded-full -z-10"></div>
        <div className="absolute bottom-0 right-0 w-[250px] h-[250px] bg-white opacity-40 blur-2xl rounded-full -z-10"></div>
        <div className="absolute top-1/2 left-[20%] w-[200px] h-[200px] bg-white opacity-20 blur-2xl rounded-full -z-10 -translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto bg-gradient-to-b from-white rounded-[2rem] shadow-md px-6 py-12 relative overflow-hidden">
          {/* Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-[#3c4b28] mb-1">
              Our Books
            </h2>
            <p className="text-sm text-gray-600">
              Discover, Research, and Connect with Books
            </p>
          </div>

          {/* Arrows */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scroll("left")}
              className="bg-[#e2f0d0] rounded-full p-2 hover:bg-[#d2e3bc] transition"
            >
              <ChevronRight className="h-5 w-5 text-green-700 rotate-180" />
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
            <button
              onClick={() => scroll("right")}
              className="bg-[#e2f0d0] rounded-full p-2 hover:bg-[#d2e3bc] transition"
            >
              <ChevronRight className="h-5 w-5 text-green-700" />
            </button>
          </div>

          {/* Scrollable Book Cards */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 py-4 ml-6 mr-6"
          >
            {book.map((book, index) => (
              <div
                key={index}
                className="min-w-[260px] max-w-[260px] h-[480px] bg-[#f1f7ea] rounded-xl py-6 px-4 shadow-sm flex flex-col justify-between items-start flex-shrink-0"
              >
                <img
                  src={`https://newmmdata-backend.onrender.com/api/books/cover/${book.id}`}
                  alt={book.title}
                  className="h-[220px] w-[200px] object-contain mb-4 self-center"
                />
                <div className="flex-1 w-full">
                  <h3 className="gulzartext text-lg font-semibold text-[#5b7a1c] mb-1 ">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-800">Writer</p>
                  <p className="text-sm font-medium text-gray-600 mb-1 truncate">
                    {book.author === "Author Placeholder" ||
                    book.author === "Mufti Farooque Mahaimi"
                      ? "Mufti Farooque Mahaimi"
                      : book.author}
                  </p>
                  {/* <p className="text-sm text-gray-800">Translator</p>
                <p className="text-sm font-medium text-gray-600 mb-4 truncate">
                  {book.translator}
                </p> */}

                  <div className="text-left ">
                    <span className="text-xs bg-[#4A7C3A] text-white px-2 py-0.5 rounded">
                      {book.language}
                    </span>
                  </div>
                </div>
                <a
                  href={`/bookdetail/${book.id}`}
                  className="inline-flex items-center text-sm text-yellow-700 bg-white px-4 py-1.5 rounded-full hover:bg-yellow-200 transition"
                >
                  Read More <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-10">
            <a
              href="/books"
              className="px-8 py-2 bg-white border border-gray-300 text-gray-800 rounded-full hover:bg-gray-100 transition"
            >
              View All Books
            </a>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="w-full bg-gradient-to-b from-white  py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              Latest Articles
            </h2>
            <p className="text-sm text-gray-600">
              Discover Insights and Knowledge Meet Our Authors
            </p>
          </div>

          {/* Urdu Tags */}
          <div className="flex justify-center flex-wrap gap-3 mb-10">
            {articles.slice(4, 6).map((article, index) => (
              <div
                key={index}
                className={`gulzartext cursor-pointer flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${
                  article.active
                    ? "bg-green-600 text-white"
                    : "bg-yellow-100 text-yellow-900"
                }`}
              >
                <span className="font-urdu text-lg cursor-pointer">
                  {article.topic}
                </span>
                <span
                  className={`${
                    article.active
                      ? "bg-white text-green-700"
                      : "bg-white text-yellow-800"
                  } px-2 py-0.5 rounded-full text-xs font-semibold`}
                >
                  {article.id}
                </span>
              </div>
            ))}
          </div>

          {/* Article Cards */}

          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            onClick={() => navigate("/article")}
          >
            {articles.slice(4, 8).map((article, index) => {
              // Determine if Urdu description is present
              const isUrdu = !!article.urduDescription;

              return (
                <div
                  key={index}
                  className="rounded-lg overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.12)] bg-[#e8f0d9]"
                >
                  {/* Image Section */}
                  <div className="relative h-[200px] w-full cursor-pointer">
                    {article.id && (
                      <img
                        src={`https://newmmdata-backend.onrender.com/api/articles/image/${article.id}`}
                        alt={article.title}
                        className="object-cover w-full h-full"
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.src =
                            "https://minaramasjid.com/assets/image/default/articles.jpeg";
                        }}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#212121]/100 via-transparent to-transparent" />

                    {/* Buttons */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                      <button className="cursor-pointer gulzartext bg-white text-black px-3 py-1 rounded-full text-sm shadow-sm opacity-[0.6]">
                        {article.topic}
                      </button>
                      <div className="flex gap-1">
                        <button className="cursor-pointer bg-white text-black px-3 py-1 rounded-full text-sm shadow-sm opacity-[0.6]">
                          Roman
                        </button>
                        <button className="cursor-pointer bg-white gulzartext text-black px-3 py-1 rounded-full text-sm shadow-sm opacity-[0.6]">
                          اردو
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 p-4 text-white ${
                        isUrdu ? "text-right" : "text-left"
                      }`}
                    >
                      {article.title && (
                        <h2 className="gulzartext font-bold text-lg leading-tight ">
                          {article.title}
                        </h2>
                      )}
                    </div>
                  </div>

                  {/* Description Section */}
                  <div className="p-4 cursor-pointer">
                    <p
                      className={`gulzartext text-sm mb-3 leading-relaxed line-clamp-2 ${
                        isUrdu ? "text-right" : "text-left"
                      }`}
                      dangerouslySetInnerHTML={{
                        __html:
                          article.urduDescription ||
                          article.englishDescription ||
                          "No description available.",
                      }}
                    ></p>

                    <div
                      className={`flex flex-col gap-1 ${
                        isUrdu ? "text-right" : "text-left"
                      }`}
                    >
                      <p className="gulzartext text-sm font-medium">
                        {isUrdu ? "مصنف" : "Writer"}:{" "}
                        {article.writers || "Unknown"}
                      </p>
                      {article.translator &&
                        article.translator.toLowerCase() !== "unknown" && (
                          <p className="gulzartext text-sm font-medium">
                            {isUrdu ? "مترجم" : "Translator"}:{" "}
                            {article.translator}
                          </p>
                        )}
                    </div>

                    <div
                      className={`flex justify-end items-center mt-2 gap-1 ${
                        isUrdu ? "text-right" : "text-left"
                      }`}
                    >
                      <Eye className="h-4 w-4 text-gray-600" />
                      <span className="text-sm">{article.views ?? 0}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="flex justify-center mt-10">
            <a
              href="/article"
              className="px-8 py-2 bg-[#e2f0d0] text-[#3c4b28] rounded-full hover:bg-[#d6eac1] transition font-medium"
            >
              Read All Articles
            </a>
          </div>
        </div>
      </section>

      {/* Our Islamic Scholars */}
      <section className="w-full  bg-gradient-to-b from-[#e4f0d1] py-12 px-4 ">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d3e2f] mb-10">
            Our Islamic Scholars
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
            {writer.map((scholar, index) => (
              <div
                key={index}
                onClick={() => navigate(`/writer/${scholar.id}`)}
                className="bg-white rounded-xl shadow-sm px-6 py-8 flex flex-col items-center"
              >
                {/* Profile Image */}
                <div className="bg-white rounded-full border-4 border-green-200 p-1 mb-4">
                  <img
                    src={`https://newmmdata-backend.onrender.com/api/writers/image/${scholar.id}`}
                    alt={scholar.name}
                    className="rounded-full w-24 h-24 object-cover bg-green-100"
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {scholar.name}
                </h3>
                <p className="text-[15px] text-orange-600 font-semibold mb-2">
                  Islamic Scholars
                </p>
                <a
                  href="/writer"
                  className="text-[14px] font-semibold text-black hover:underline"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>© 2023 Maula Ali Research Centre. All Rights Reserved.</p>
        </div>
      </footer> */}
    </main>
  );
}
