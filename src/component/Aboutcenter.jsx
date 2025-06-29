import React, { useEffect, useState } from "react";
import image1 from "../../public/Aboutcenter/about1.png";
import image2 from "../../public/Aboutcenter/about2.png";
import image3 from "../../public/Aboutcenter/about3.png";
import image4 from "../../public/Aboutcenter/about4.png";
import bg from "../../public/images/bg.png";
import Userimg from "../../public/Scholar/user.png";
import Navbar from "./Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import logo from "../../public/images/marc.png";
import { Helmet } from "react-helmet";

export default function Home() {
  const [activeLang, setActiveLang] = useState("en");
  const [writer, setWriter] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchWriter = async () => {
      try {
        const response = await fetch(
          "https://api.minaramasjid.com/api/writers"
        );
        const data = await response.json();
        // console.log("Fetched data:", data);
        setWriter(data); // assuming API returns { questions: [...] }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchWriter();
  }, []);

  const navigate = useNavigate();

  const sections = [
    {
      id: 1,
      title: "Minara Masjid Trust",
      img: image1,
      imgPosition: "left",
      en: `Maula Ali Research Centre aims to acquire old Islamic manuscripts (Interpretations, Commentaries, Exegesis, etc.) of our ancestors from libraries across the world which have not been published; if published, they are no longer accessible, etc. and work upon its publication according to modern standards by carrying out research on the Arabic and Persian scripts, referencing, easy translation into multiple languages, mainly English, Hindi and Urdu, and lastly, printing and distributing it amongst the scholars, research experts, intellectuals and the entire Muslim Ummah.`,
      ur: `مولیٰ علی ریسرچ سینٹر کا مقصد دنیا بھر کے کتب خانوں سے ہمارے اسلاف کے پرانے اسلامی مخطوطات (تفاسیر، تشریحات، وغیرہ) حاصل کرنا ہے، جو یا تو شائع نہیں ہوئے یا اگر شائع ہوئے ہیں تو اب دستیاب نہیں ہیں، اور ان کی اشاعت کو جدید معیار کے مطابق انجام دینا، جیسے عربی و فارسی رسم الخط پر تحقیق، حوالہ جات، آسان ترجمہ (انگریزی، ہندی، اردو) اور پھر اس کا اشاعت و تقسیم علماء، محققین اور پوری مسلم امت میں کرنا۔`,
    },
    {
      id: 2,
      title: "Maula Ali Research Center",
      img: image2,
      imgPosition: "right",
      en: `Maula Ali Research Centre aims to acquire old Islamic manuscripts of our ancestors that have not been published or are no longer accessible, and bring them to life through modern research, translation, and publication.`,
      ur: `مولیٰ علی ریسرچ سینٹر کا مقصد ہمارے اسلاف کے وہ اسلامی مخطوطات حاصل کرنا ہے جو یا تو شائع نہیں ہوئے یا اب قابل رسائی نہیں ہیں، اور انہیں جدید تحقیق، ترجمہ اور اشاعت کے ذریعے دوبارہ زندہ کرنا ہے۔`,
    },
    {
      id: 3,
      title: "Biographies",
      img: image3,
      imgPosition: "left",
      en: `We preserve and publish biographies of notable Islamic figures, ensuring their contributions and teachings remain accessible for future generations.`,
      ur: `ہم نمایاں اسلامی شخصیات کی سوانح حیات کو محفوظ کرتے ہیں اور شائع کرتے ہیں تاکہ ان کی خدمات اور تعلیمات آئندہ نسلوں تک پہنچ سکیں۔`,
    },
    {
      id: 4,
      title: "Team",
      img: image4,
      imgPosition: "right",
      en: `Our dedicated team of scholars and researchers is committed to preserving the intellectual heritage of Islam through academic excellence and collaboration.`,
      ur: `ہماری محنتی ٹیم علماء اور محققین پر مشتمل ہے جو علمی مہارت اور تعاون کے ذریعے اسلامی فکری ورثے کے تحفظ کے لیے پرعزم ہے۔`,
    },
  ];

  const slugify = (text) =>
    text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "");

  const title = "About Us | Maula Ali Research Center ";
  const pageUrl = "minaramasjid.com";
  const description = "minaramasjid.com";

  return (
    <main
      className="min-h-screen bg-repeat bg-opacity-80 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: "#f5f3e6",
        backgroundBlendMode: "overlay",
      }}
    >

      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <link rel="icon" href={logo} type="image/x-icon" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
      </Helmet>
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
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <header className="text-center mb-20">
          <div className="inline-block mb-6">
            <div className="w-20 h-1 bg-[#d4a762] mb-2 mx-auto"></div>
            <h1 className="text-2xl md:text-5xl font-serif text-[#2a4a24] mb-4 font-bold">
              Maula Ali Research Center
            </h1>
            <div className="w-20 h-1 bg-[#d4a762] mt-2 mx-auto"></div>
          </div>
          <p className="text-[#3c5c36] max-w-3xl mx-auto text-lg md:text-xl leading-relaxed">
            Discover a wealth of Islamic knowledge, from insightful articles to
            in-depth research. Explore the rich heritage of Islam and gain a
            deeper understanding of its teachings and practices.
          </p>
        </header>

        <div className="space-y-28">
          {sections.map((section) => (
            <div
              key={section.id}
              className={`relative flex flex-col ${section.imgPosition === "right"
                  ? "md:flex-row-reverse"
                  : "md:flex-row"
                } items-center gap-8`}
            >
              <div className="w-full md:w-1/3 relative">
                <div className="relative aspect-square rounded-lg overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src={section.img}
                    alt={section.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="w-full md:w-2/3 relative">
                <div className="bg-white p-6 md:p-10 rounded-xl shadow-lg relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-8 h-1 bg-[#d4a762] mr-3"></div>
                      <span className="text-[#d4a762] font-medium tracking-wider">
                        ABOUT
                      </span>
                    </div>
                    <div className="relative inline-block w-32 h-9">
                      <input
                        type="checkbox"
                        id="lang-toggle"
                        className="sr-only"
                        checked={activeLang === "ur"}
                        onChange={() =>
                          setActiveLang(activeLang === "en" ? "ur" : "en")
                        }
                      />

                      <label
                        htmlFor="lang-toggle"
                        className="block w-full h-full rounded-full cursor-pointer border border-gray-300 bg-white relative shadow-inner overflow-hidden"
                      >
                        {/* Background text for both options */}
                        <div className="flex w-full h-full items-center justify-between px-3 text-sm font-semibold z-0 relative">
                          <span className="text-gray-500">English</span>
                          <span className="text-gray-500">اردو</span>
                        </div>

                        {/* Sliding indicator with active text */}
                        <div
                          className={`absolute top-[2px] ${activeLang === "ur" ? "right-2" : "left-2"
                            } w-[40%] h-[80%] bg-[#d4a762] text-white flex items-center justify-center text-sm font-semibold rounded-full transition-all duration-300 z-10`}
                        >
                          {activeLang === "ur" ? "اردو" : "English"}
                        </div>
                      </label>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-serif text-[#2a4a24] mb-5 font-bold">
                    {section.title}
                  </h2>
                  <p
                    className={`text-[#555] gulzartext leading-relaxed text-base md:text-lg whitespace-pre-wrap ${activeLang === "ur" ? "text-right" : ""
                      }`}
                    dir={activeLang === "ur" ? "rtl" : "ltr"}
                  >
                    {activeLang === "ur" ? section.ur : section.en}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <section className="w-full py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#2d3e2f] mb-10">
            Our Islamic Scholars
          </h2>

          <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {writer.map((writer, index) => (
              <div
                key={index}
                className="  bg-white rounded-xl shadow-sm px-6 py-8 flex flex-col items-center"
              >
                <div className="bg-white rounded-full border-4 border-green-200 p-1 mb-4">
                  <img
                    src={`https://api.minaramasjid.com/api/writers/image/${writer.id} `}
                    alt={writer.name}
                    className="rounded-full w-24 h-24 object-cover bg-green-100"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = Userimg; // set fallback image
                    }}
                  />
                </div>
                <h3 className="  text-lg font-semibold text-gray-800 mb-1">
                  {writer.name}
                </h3>
                <p className=" text-[15px] text-orange-600 font-semibold mb-2">
                  Islamic Scholar
                </p>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/writer/${writer.id}/${slugify(writer.name)}`);
                  }}
                  className="text-[14px] font-semibold text-black hover:underline"
                  style={{ cursor: "pointer" }}
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
