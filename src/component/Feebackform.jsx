"use client";
import { useState } from "react";
import axios from "axios";
import * as Dialog from "@radix-ui/react-dialog";
import { CheckCircle } from "lucide-react";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const feedbackData = {
      id: Date.now().toString(), // Simple unique ID
      name: formData.name,
      email: formData.email,
      feedback: formData.feedback,
      createdOn: new Date().toISOString().slice(0, 19).replace("T", " "), // MySQL DATETIME format
      modifiedOn: new Date().toISOString().slice(0, 19).replace("T", " "),
      isDeleted: 0,
    };

    try {
      await axios.post("https://api.minaramasjid.com/api/feedback", feedbackData);
      setFormData({ name: "", email: "", feedback: "" });
      setOpen(true);
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f5e9" }}>
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#4a7031] mb-8 tracking-wider">
            FEEDBACK FORM
          </h2>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-green-300 p-8 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="h-12 w-full px-4 bg-[#C0D7AA] border border-green-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  />
                </div>

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
                    className="h-12 w-full px-4 bg-[#C0D7AA] border border-green-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="feedback" className="text-[#4a7031] font-medium block">
                  Feedback <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="feedback"
                  required
                  rows={8}
                  value={formData.feedback}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-[#C0D7AA] border border-green-300 rounded-lg focus:border-green-500 focus:ring-green-500 focus:outline-none resize-none"
                  placeholder="Please share your feedback..."
                />
              </div>

              <div className="flex justify-center pt-4">
                <button
                  type="submit"
                  className="bg-[#4a7031] text-white font-semibold px-8 py-3 rounded-lg tracking-wider hover:bg-[#3b5a28] transition duration-300"
                >
                  SUBMIT FORM
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Success Dialog */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 max-w-md w-full bg-white rounded-2xl shadow-xl transform -translate-x-1/2 -translate-y-1/2 p-8 text-center space-y-4">
            <CheckCircle className="text-green-500 w-12 h-12 mx-auto" />
            <h3 className="text-2xl font-bold text-green-700 gulzartext">جزاك الله خيراً</h3>
            <p className="text-gray-700">
              Thank you for submitting the form.
              <br />
              We’ll get back to you soon!
            </p>
            <button
              onClick={() => setOpen(false)}
              className="mt-4 bg-[#C0D7AA] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#aac899] transition"
            >
              Close
            </button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
