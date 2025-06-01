"use client";
import { Search } from "lucide-react";

export default function FeedbackForm() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f5e9" }}>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Feedback Form */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#4a7031] mb-8 tracking-wider">
            FEEDBACK FORM
          </h2>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-green-300 p-8 shadow-lg">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-[#4a7031] font-medium block"
                  >
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="h-12 w-full px-4 bg-[#C0D7AA] border border-green-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-[#4a7031] font-medium block"
                  >
                    Email address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      required
                      className="h-12 w-full px-4 pr-32 bg-[#C0D7AA] border border-green-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none"
                    />
                    {/* Email icons */}
                  </div>
                </div>
              </div>

              {/* Feedback Field */}
              <div className="space-y-2">
                <label
                  htmlFor="feedback"
                  className="text-[#4a7031] font-medium block"
                >
                  Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  required
                  rows={8}
                  className="w-full px-4 py-2 bg-[#C0D7AA] border border-green-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none resize-none"
                  placeholder="Please share your feedback..."
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#C0D7AA] cursor-pointer text-white text-bold px-8 py-3 rounded-lg font-medium tracking-wider"
                >
                  SUBMIT FORM
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
