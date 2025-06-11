import { MapPin, Mail, MessageCircle } from "lucide-react";
import Navbar from "./Navbar/Navbar";
import bg from "../../public/images/bg.png";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#e4f0d0] relative overflow-hidden font-sans">
      <Navbar />

      {/* Geometric Background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
        }}
      ></div>
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="hexagons"
              x="0"
              y="0"
              width="60"
              height="52"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="30,2 52,15 52,37 30,50 8,37 8,15"
                fill="none"
                stroke="white"
                strokeWidth="2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-2">
            CONTACT US
          </h1>
          <p className="text-lg text-green-800">
            Reach Out to Us – We're Here to Answer Your Questions and Assist
            You!
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Address */}
          <a
            href="https://maps.app.goo.gl/Xx5V4rFsAiu3KSFM8"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-lg text-center p-6 hover:underline transition duration-200"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Our Address
            </h3>
            <p className="text-sm text-gray-700">
             22, Mohammed Ali Rd, Pydhonie, Mandvi, Mumbai, Maharashtra 400003
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:maulaaliresearchcentre13@gmail.com"
            className="bg-white rounded-lg shadow-lg text-center p-6 hover:underline transition duration-200"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              Email Us
            </h3>
            <p className="text-sm text-gray-700">
              maulaaliresearchcentre13@gmail.com
            </p>
          </a>

          {/* WhatsApp */}
          <a
            href="https://whatsapp.com/channel/0029Vb2RFD4AO7REg2KDdF2j" // Replace with actual WhatsApp link
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-lg text-center p-6 hover:underline transition duration-200"
          >
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">
              WhatsApp Channel
            </h3>
            <p className="text-sm text-gray-700 gulzartext">
              MARC ( مولا علی ریسرچ سینٹر)
            </p>
          </a>
        </div>

        {/* Map Embed */}
        <div className="bg-white rounded-lg shadow-lg p-4 md:p-6">
          <div className="w-full h-[400px] rounded-lg overflow-hidden">
            <iframe
              title="Minara Masjid Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3414.799608647433!2d72.833282258377!3d18.95455650412549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf64a92d8087%3A0x96ee5c3fb35da7b0!2sMinara%20Masjid!5e1!3m2!1sen!2sin!4v1749606219028!5m2!1sen!2sin"
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{ border: 0 }}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
