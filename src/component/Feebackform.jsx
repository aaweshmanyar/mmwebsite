"use client";
import { useState } from "react";
import axios from "axios";
import { CheckCircle } from "lucide-react";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) setError(""); // clear error on user input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, feedback } = formData;

    if (!name || !email || !feedback) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.post("https://api.minaramasjid.com/api/feedback", {
        name,
        email,
        feedback,
      });

      if (res.status === 201) {
        setFormData({ name: "", email: "", feedback: "" });
        setOpen(true);
      }
    } catch (err) {
      console.error("Submission error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Please try again later.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f5e9]">
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#4a7031] mb-8 tracking-wider">
            FEEDBACK FORM
          </h2>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-green-300 p-8 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-[#4a7031] font-medium block">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 w-full px-4 bg-[#C0D7AA] border border-green-300 rounded-lg focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[#4a7031] font-medium block">
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 w-full px-4 bg-[#C0D7AA] border border-green-300 rounded-lg focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Feedback Field */}
              <div className="space-y-2">
                <label htmlFor="feedback" className="text-[#4a7031] font-medium block">
                  Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  rows={8}
                  required
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#C0D7AA] border border-green-300 rounded-lg focus:ring-green-500 focus:outline-none resize-none"
                  placeholder="Please share your feedback..."
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-red-600 text-sm font-medium text-center">{error}</p>
              )}

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#4a7031] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#3b5a28] transition"
                >
                  SUBMIT FORM
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Success Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 shadow-xl text-center max-w-md w-full">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto mb-2" />
            <h3 className="text-2xl font-bold text-green-700 gulzartext">جزاك الله خيراً</h3>
            <p className="text-gray-700 mt-2">
              Thank you for submitting the form. <br /> We’ll get back to you soon!
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-6 bg-[#C0D7AA] text-white px-6 py-2 rounded-lg hover:bg-[#aac899] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}