import React from 'react'
import Navbar from './Navbar/Navbar'
import logo from '../../public/images/marc.png'
import { useState, useEffect } from 'react'
import Userprofle from "../../public/Scholar/user.png"
import { Helmet } from 'react-helmet'

const Writers = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [writer, setWriter] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {


                const writerRes = await fetch(
                    "https://api.minaramasjid.com/api/writers"
                );
                const writerData = await writerRes.json();
                setWriter(writerData);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    const slugify = (text) =>
        text
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-") // Replace spaces with hyphens
            .replace(/[.,\/#!$%\^&\*;:{}=\_`~()؟“”"']/g, "") // Remove punctuation
            .replace(/[-]+/g, "-");


    const title = "All Writers | Maula Ali Research Center ";
    const pageUrl = "minaramasjid.com";
    const description = "minaramasjid.com";
    return (
        <div>

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



            <section className="w-full  bg-gradient-to-b from-[#e4f0d1] py-12 px-4 ">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[#2d3e2f] mb-10">
                        Our Islamic Scholars
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 cursor-pointer">
                        {writer.map((scholar, index) => (
                            <div
                                key={index}
                                onClick={() =>
                                    navigate(`/writer/${scholar.id}/${slugify(scholar.name)}`)
                                }
                                className="bg-white rounded-xl shadow-sm px-6 py-8 flex flex-col items-center"
                            >
                                {/* Profile Image */}
                                <div className="bg-white rounded-full border-4 border-green-200 p-1 mb-4">
                                    <img
                                        src={`https://api.minaramasjid.com/api/writers/image/${scholar.id}`}
                                        alt={scholar.name}
                                        className="rounded-full w-24 h-24 object-cover bg-green-100"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = Userprofle;
                                        }}
                                    />
                                </div>

                                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                                    {scholar.name}
                                </h3>
                                <p className="text-[15px] text-orange-600 font-semibold mb-2">
                                    Islamic Scholars
                                </p>
                                <a
                                    href={`/writer/${scholar.id}/${slugify(scholar.name)}`}
                                    className="text-[14px] font-semibold text-black hover:underline"
                                >
                                    View Profile
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Writers