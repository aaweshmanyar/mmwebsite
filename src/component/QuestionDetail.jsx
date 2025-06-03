import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import bg from "../../public/images/newbg.png";
import user from "../../public/images/user.png";
import logo from "../../public/images/marclogo.png";

const QuestionDetail = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [allQuestions, setAllQuestions] = useState([]);
  const [question, setQuestion] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const res = await fetch(
          "https://newmmdata-backend.onrender.com/api/questions"
        );
        const data = await res.json();
        setAllQuestions(data);
      } catch (err) {
        console.error("Error fetching all questions:", err);
      }
    };

    fetchAllQuestions();
  }, []);

  useEffect(() => {
    const fetchSingleQuestion = async () => {
      try {
        const res = await fetch(
          `https://newmmdata-backend.onrender.com/api/questions/${id}`
        );
        const data = await res.json(); // Safe to parse now
        setQuestion(data);
        console.log("Fetched Data", data);
      } catch (err) {
        console.error("Error fetching question:", err);
      }
    };

    if (id) fetchSingleQuestion();
  }, [id]);

  const formatDescription = (htmlString) => {
    return htmlString
      .replace(/<br\s*\/?>(?=<\/?.+?>|\s|$)/gi, "\n")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .trim();
  };

  if (!question) {
    return <div className="text-center p-4">لوڈ ہو رہا ہے...</div>;
  }

  const slideQuestion = allQuestions.slice(1, 13)

  return (
    <main className="min-h-screen bg-[#f0f2e6] relative">
      <header className="bg-[#718e56] sticky top-0 z-50 shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a href="/" className="hover:text-yellow-200">
                Home
              </a>
              <a href="/about" className="hover:text-yellow-200">
                About Center
              </a>
              <a href="/books" className="hover:text-yellow-200">
                Books
              </a>
              <a href="/newsandevent" className="hover:text-yellow-200">
                News & Event
              </a>
            </nav>
            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
              <img
                src={logo}
                alt="Logo"
                className="w-16 h-16 rounded-full object-contain"
              />
            </div>
            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a href="/requestbook" className="hover:text-yellow-200">
                Request a Book
              </a>
              <a href="/article" className="hover:text-yellow-200">
                Articles
              </a>
              <a href="/question" className="hover:text-yellow-200">
                Questions
              </a>
              <a href="/contact" className="hover:text-yellow-200">
                Contact
              </a>
            </nav>
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white focus:outline-none"
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
          <div
            className={`md:hidden transition-all overflow-hidden ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-4 px-2 text-white bg-[#5a7544] rounded-b-xl">
              {[
                "Home",
                "About Center",
                "Books",
                "News & Event",
                "News",
                "Articles",
                "question",
                "Contact",
              ].map((item, idx) => (
                <a
                  key={idx}
                  href={`/${item.toLowerCase().replace(" ", "")}`}
                  className="hover:bg-[#4f6639] px-4 py-2 rounded"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div
        className="absolute inset-0 opacity-100 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      />

      <section
        className="relative z-40 bg-cover bg-center rounded-b-[3rem]"
        style={{ backgroundImage: `url(${bg})` }}
      >
        <div className="flex flex-col items-center justify-center py-10 px-6 w-full bg-[#C0D7AA]/80">
          <h1 className="amiri-bold text-3xl md:text-4xl font-bold text-[#4a7031] text-center rtl mb-3">
            دار الإفتاء ریسرچ سینٹر سوال و جوابات تحقیقات
          </h1>
          <p className="gulzartext text-base md:text-lg text-[#4a7031] text-center rtl leading-relaxed">
            یہ ایک ایسا اسلامی تحقیقی مرکز ہے جو اسلام کے بنیادی اصولوں اور جدید
            دور کے چیلنجوں کے درمیان ہم آہنگی پیدا کرنے پر توجہ مرکوز کرتا ہے۔
          </p>
        </div>
      </section>

      <div className="rounded-xl max-w-6xl mx-auto mt-8 p-6 md:p-8 ">
        <div className="flex items-center justify-end gap-2 mb-4 ltr">
          <h2 className="text-[#4a7031] text-xl font-extrabold gulzartext">
            سوال نمبر
          </h2>
          <span className="bg-[#C0D7AA] text-[#4a7031] font-bold rounded-full px-3 py-1 text-sm">
            {question.id}
          </span>
        </div>
        <p className="text-[#4a7031] text-lg gulzartext mb-6 leading-loose text-center"  dangerouslySetInnerHTML={{ __html: question.questionEnglish || question.questionUrdu}} 
>
        </p>
      </div>

      <div className="flex flex-col items-end gap-2 mt-4 md:mb-16 mr-6 px-4 text-right">
        <div className="flex items-center gap-4 justify-end">
          <div>
            <p className="text-sm text-gray-600 gulzartext">اسلامک اسکالر</p>
            <h2 className="font-extrabold text-xl text-[#4a7031] gulzartext">
             {question.writer}
            </h2>
          </div>
          <img
            src={user}
            alt="Scholar"
            className="w-16 h-16 rounded-full border-2 border-[#6a8a4f]"
          />
        </div>
        <div className="text-[#4a7031] text-lg font-bold gulzartext">
          الجواب
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-8">
        <div className="w-full md:w-1/4 bg-white rounded-xl shadow-sm border border-green-100 order-2 md:order-1">
          <div className="text-black p-4 text-center">
            <h2 className="text-2xl font-bold border-b pb-2 gulzartext">
              دیگر سوالات
            </h2>
          </div>
          <div className="p-4 flex flex-col gap-4 rtl cursor-pointer">
            {allQuestions.slice(0, 5).map((q, idx) => (
              <div
                key={q.id || idx}
                onClick={() => navigate(`/question/${q.id}`)}
                className="border-b border-green-200 pb-4 last:border-b-0"
              >
                <div className="flex justify-end mb-2">
                  <span className="bg-[#5a8c3c] text-white rounded-full px-3 py-1 text-sm cursor-pointer">
                    سوال نمبر {q.number || idx + 1}
                  </span>
                </div>
                <p
                  dir={
                    /[\u0600-\u06FF]/.test(q.questionUrdu || q.questionEnglish)
                      ? "rtl"
                      : "ltr"
                  }
                  className={`text-gray-700 leading-relaxed text-base gulzartext cursor-pointer line-clamp-2 ${
                    /[\u0600-\u06FF]/.test(q.questionUrdu || q.questionEnglish)
                      ? "text-right"
                      : "text-left"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: q.questionUrdu || q.questionEnglish,
                  }}
                ></p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-3/4 bg-white rounded-xl shadow-sm p-6 order-1 md:order-2">
          <div className="rtl text-right leading-loose text-[#4a7031] text-lg gulzartext ">
            <div
              className="gulzartext leading-loose text-[#4a7031] text-lg  "
              dangerouslySetInnerHTML={{ __html: question.answerUrdu || question.answerEnglish }}
            ></div>
          </div>
        </div>
      </div>

      <section className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl p-6 shadow-sm mb-12 max-w-3xl mx-auto lg:ml-[580px] lg:mx-0">
          <div className="flex flex-col items-end gap-6 text-right">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-green-100 border-4 border-green-200 flex items-center justify-center">
              <img src={user} alt="Scholar Icon" width={80} height={80} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-2 gulzartext">
                اسلامک اسکالر
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4 gulzartext">
                {question.writer}
              </h2>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed gulzartext">
                 ایک معروف اسلامی عالم، مدرس اور مصنف ہیں...
               <a href="/writer" className="cursor-pointer">(مزید معلومات)</a> 
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eaf3df] py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-right font-bold text-2xl text-[#1f1f1f] mb-6 gulzartext">
            متعلق سوالات
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 rtl">
            {allQuestions.slice(1,14).map((q, idx) => (
              <div
                key={q._id}
                onClick={() => navigate(`/question/${q.id}`)}
                className="bg-[#eaf3df] rounded-xl p-4 cursor-pointer"
              >
                <div className="flex justify-end mb-3">
                  <span className="bg-[#5a8c3c] text-white rounded-full px-3 py-0.5 text-sm gulzartext">
                    سوال نمبر {q.id || idx + 1}
                  </span>
                </div>
                <p
                  className={`text-base leading-relaxed gulzartext line-clamp-2 ${
                    /[\u0600-\u06FF]/.test(q.questionUrdu || q.questionEnglish)
                      ? "text-right"
                      : "text-left"
                  } text-[#1f1f1f]`}
                  dangerouslySetInnerHTML={{
                    __html: q.questionUrdu || q.questionEnglish,
                  }}
                ></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default QuestionDetail;
