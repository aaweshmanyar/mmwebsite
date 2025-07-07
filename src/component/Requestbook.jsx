import bg from "../../public/images/bg.png";
import Logo from "../../public/images/marc.png";
import logo from '../../public/images/marc.png'
import React, { useState, useEffect } from "react";
import { Check, Menu, X, Search } from "lucide-react";
import QrCode from "../../public/images/qr.jpg";
import { Helmet } from "react-helmet";

const Requestbook = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [book, setBook] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    books: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ""
  });

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
    setFormData({ ...formData, email: value });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.contact || !formData.books) {
      setSubmitStatus({
        success: false,
        message: "Please fill in all required fields."
      });
      return;
    }

    if (!isValidEmail) {
      setSubmitStatus({
        success: false,
        message: "Please enter a valid email address."
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.minaramasjid.com/api/requestBook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          books: formData.books,
          address: formData.address // optional field
        })
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          success: true,
          message: "Book request submitted successfully!"
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          contact: "",
          address: "",
          books: ""
        });
        setEmail("");
      } else {
        setSubmitStatus({
          success: false,
          message: data.error || "Error submitting book request."
        });
      }
    } catch (error) {
      console.error("Error submitting request:", error);
      setSubmitStatus({
        success: false,
        message: "Network error. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const booksRes = await fetch(
          "https://api.minaramasjid.com/api/printedBooks"
        );
        const booksData = await booksRes.json();
        setBook(booksData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);


  const title = "Books Request | Maula Ali Research Center ";
  const pageUrl = "minaramasjid.com";
  const description = "minaramasjid.com";

  return (
    <div className="w-full min-h-screen bg-[#f8efd0] relative overflow-hidden">

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
      <div
        className="absolute inset-0 opacity-36 pointer-events-none"
      ></div>
      {/* Header */}
      <header className="bg-[#783F1D] sticky top-0 z-50 shadow-md border-b border-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4 relative">
                {/* Left Nav (Desktop) */}
                <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
                  <a href="/" className="hover:opacity-[0.6]">
                    Home
                  </a>
                  <a href="/about" className="hover:opacity-[0.6]">
                    About
                  </a>
                  <a href="/newsandevent" className="hover:opacity-[0.6]">
                    News & Event
                  </a>
                  <a href="/books" className="hover:opacity-[0.6]">
                    Books
                  </a>
                </nav>
    
                {/* Center Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-7 bg-white rounded-full p-1 shadow-lg border border-green-100 z-10">
                  <img
                    src={Logo}
                    alt="Logo"
                    className="w-16 h-16 rounded-full object-contain"
                  />
                </div>
    
                {/* Right Nav (Desktop) */}
                <nav className="hidden md:flex gap-6 text-md font-semibold text-white tracking-wide">
                  <a href="/article" className="hover:opacity-[0.6]">
                    Articles
                  </a>
                  <a href="/question" className="hover:opacity-[0.6]">
                    Question Answer
                  </a>
                  <a href="/requestbook" className="hover:opacity-[0.6]">
                    Request a Book
                  </a>
                  <a href="/contact" className="hover:opacity-[0.6]">
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
    
              {/* Mobile Dropdown Menu */}
              <div
                className={`md:hidden transition-all overflow-hidden ${menuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                  }`}
              >
                <div className="flex flex-col gap-3 py-4 px-2 bg-[#783F1D]  text-white rounded-b-xl">
                  <a
                    href="/"
                    className="text-white px-4 py-2 "
                  >
                    Home
                  </a>
                  <a
                    href="/about"
                    className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                  >
                    About
                  </a>
                  <a
                    href="/books"
                    className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                  >
                    Books
                  </a>
                  <a
                    href="/newsandevent"
                    className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                  >
                    News & Event
                  </a>
                  <a
                    href="/article"
                    className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                  >
                    Articles
                  </a>
                  <a
                    href="/question"
                    className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                  >
                    Question Answer
                  </a>
                  <a
                    href="/requestbook"
                    className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                  >
                    Request a Book
                  </a>
                  <a
                    href="/contact"
                    className="hover:bg-[#783F1D] px-4 py-2 hover:text-white rounded"
                  >
                    Contact
                  </a>
                </div>
              </div>
            </div>
          </header>

      {/* Form Section */}
      <div className="relative z-10 w-full py-12 px-4 mt-6 md:px-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-10">
          <h1 className="text-[#783F1D] text-2xl sm:text-3xl font-bold text-center mb-6">
            Request a Book
          </h1>

          {submitStatus.message && (
            <div className={`mb-6 p-4 rounded ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {submitStatus.message}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Your email"
                  className="w-full border border-gray-300 rounded px-3 py-2 pr-10"
                  required
                />
                {isValidEmail && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500">
                    <Check size={16} />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="contact"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Contact
              </label>
              <input
                type="text"
                id="contact"
                value={formData.contact}
                onChange={handleInputChange}
                placeholder="Your phone number"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Full Address{" "}
                <span className="text-xs text-gray-500">
                  (each street provided)
                </span>
              </label>
              <textarea
                id="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Write Full Address"
                className="mt-1 w-full border border-gray-300 rounded px-3 py-2 min-h-[80px]"
              />
            </div>

            <div>
              <label
                htmlFor="books"
                className="block text-sm font-medium text-[#6b3c1a]"
              >
                Select Book's
              </label>
              <select
                id="books"
                value={formData.books}
                onChange={handleInputChange}
                className="gulzartext w-full mt-1 border border-gray-300 rounded px-3 py-2"
                required
              >
                <option value="" disabled>
                  Select Books
                </option>
                {book.length > 0 ? (
                  book.map((b) => (
                    <option key={b._id} value={b.title}>
                      {b.bookName}
                    </option>
                  ))
                ) : (
                  <option disabled>Loading books...</option>
                )}
              </select>
            </div>

            <div className="pt-4 text-center">
              <h3 className="text-sm font-medium text-[#6b3c1a]">Donate</h3>
              <p className="text-xs text-gray-600 mt-1 max-w-md mx-auto">
                If you wish to support our efforts in providing books to those
                in need, scan the QR code to donate.
              </p>
              <div className="flex justify-center mt-4">
                <img
                  src={QrCode}
                  alt="Donation QR Code"
                  className="w-28 h-28 object-contain"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6b3c1a] hover:bg-[#5a3315] text-white rounded px-4 py-2 mt-6 transition duration-300 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Requestbook;