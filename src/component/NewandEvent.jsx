import { Search, ChevronDown, ChevronRight, Eye, Menu, X } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import bg from "../../public/images/newbg.png";
import Logo from "../../public/images/marclogo.png";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbar";

const NewandEvent = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [event, setEvent] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Eventres = await fetch(
          "https://api.minaramasjid.com/api/events"
        );
        const EventData = await Eventres.json();
        setEvent(EventData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.offsetWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // ✅ Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (!scrollRef.current) return;

      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (scrollLeft >= maxScrollLeft) {
        // Scroll back to start when end is reached
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        // Scroll right
        container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
      }
    }, 2000); // change every 4 seconds

    return () => clearInterval(interval); // cleanup on unmount
  }, []);
  return (
    <div className="min-h-screen bg-[#e4f0d0] relative">
      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      {/* <header className="relative z-50 bg-[#718e56] text-white">

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

        
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-14 z-30 bg-white rounded-full p-1 shadow-md">
            <img
              src={Logo}
              alt="Logo"
              className="w-20 h-20 object-contain rounded-full"
            />
          </div>

          
          <div className="hidden md:flex items-center space-x-5 font-medium text-[15px]">
           
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
      </header> */}

      <header className="bg-[#718e56] sticky  top-0 z-50 shadow-md border-b border-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 relative">
            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/newsandevent">News & Event</a>
              <a href="/books">Books</a>
            </nav>

            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
              <img
                src={Logo}
                alt="Logo"
                className="w-16 h-16 rounded-full object-contain"
              />
            </div>

            <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
              <a href="/article">Articles</a>
              <a href="/question">Question Answer</a>
              <a href="/requestbook">Request a Book</a>
              <a href="/contact">Contact</a>
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
            className={`md:hidden transition-all overflow-hidden ${
              menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-col gap-3 py-4 px-2 text-white bg-[#5a7544] rounded-b-xl">
              <a href="/" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                Home
              </a>
              <a href="/about" className="hover:bg-[#4f6639] px-4 py-2 rounded">
                About
              </a>
              <a
                href="/books"
                className="hover:bg-[#4f6639] px-4 py-2 rounded"
              >
                Books
              </a>
              <a href="/newsandevent" className="hover:bg-[#4f6639] px-4 py-2 rounded">
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

      <div className="flex items-center justify-center  h-[200px] w-full bg-[#C0D7AA]/80 rounded-b-4xl">
        <h1 className="gulzartext text-3xl md:text-4xl font-bold text-[#4a7031] text-center rtl px-4">
          News and Events
        </h1>
      </div>

      <section className="w-full py-10 px-4">
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
                className="w-[90%] sm:w-[47%] md:w-[47%] lg:w-[23%] mb-2 flex-shrink-0 bg-gradient-to-b from-[#f6fbf1] rounded-2xl p-4 shadow-md"
              >
                <div className="overflow-hidden rounded-xl mb-4">
                  <img
                    src={`https://api.minaramasjid.com/api/events/image/${event.id}`}
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
                    href="/newsandevent"
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
        </div>
      </section>
    </div>
  );
};

export default NewandEvent;
