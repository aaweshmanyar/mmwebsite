import React, { useEffect, useState } from "react";
import image1 from "../../public/Aboutcenter/about1.png";
import image2 from "../../public/Aboutcenter/about2.png";
import image3 from "../../public/Aboutcenter/about3.png";
import image4 from "../../public/Aboutcenter/about4.png";
import bg from "../../public/images/bg.png";
import Userimg from "../../public/Scholar/user.png";
import Navbar from "./Navbar/Navbar";

export default function Home() {
  const [activeLang, setActiveLang] = useState("en");
  const [writer, setWriter] = useState([]);

    useEffect(() => {
      const fetchWriter = async () => {
        try {
          const response = await fetch("https://newmmdata-backend.onrender.com/api/writers");
          const data = await response.json();
          console.log("Fetched data:", data);
          setWriter(data); // assuming API returns { questions: [...] }
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchWriter();
    }, []);

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

  return (
    <main
      className="min-h-screen bg-repeat bg-opacity-80 relative"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundColor: "#f5f3e6",
        backgroundBlendMode: "overlay",
        
      }}
    >
      <Navbar />
      <div className="absolute inset-0 z-0 opacity-20" />

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
              className={`relative flex flex-col ${
                section.imgPosition === "right"
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
                        onChange={() => setActiveLang(activeLang === "en" ? "ur" : "en")}
                      />
                      <label
                        htmlFor="lang-toggle"
                        className={`block overflow-hidden h-9 rounded-full cursor-pointer transition-all duration-300 ${
                          activeLang === "ur" ? "  bg-[#d4a762]" : "bg-gray-200 "
                        }`}
                      >
                        <span
                          className={`absolute flex items-center justify-center w-1/2 h-9 rounded-full text-sm font-medium transition-all duration-300 ${
                            activeLang === "ur"
                              ? "left-0 bg-white text-[#d4a762]"
                              : "left-1/2 bg-[#d4a762] text-white"
                          }`}
                        >
                          {activeLang === "ur" ? "اردو" : "English"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-serif text-[#2a4a24] mb-5 font-bold">
                    {section.title}
                  </h2>
                  <p
                    className={`text-[#555] gulzartext leading-relaxed text-base md:text-lg whitespace-pre-wrap ${
                      activeLang === "ur" ? "text-right" : ""
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
                   src={`https://newmmdata-backend.onrender.com/api/writers/image/${writer.id}`}

                    alt={writer.name}
                    className="rounded-full w-24 h-24 object-cover bg-green-100"
                  />
                </div>
                <h3 className="  text-lg font-semibold text-gray-800 mb-1">
                  {writer.name}
                </h3>
                <p className=" text-[15px] text-orange-600 font-semibold mb-2">
                  Islamic Scholar
                </p>
                <a
                  href="/writer"
                  className=" text-[14px] font-semibold text-black hover:underline " style={{cursor:'pointer'}}
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