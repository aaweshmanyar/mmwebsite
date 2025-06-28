import React from "react";
import { Share2 } from "lucide-react"; // Install via: npm install lucide-react

export default function ShareEventButton({ eventId, title }) {
  const encodedTitle = encodeURIComponent(title || "event");
  const sharePageUrl = `https://mm-server-tbbo.onrender.com/share/event/${eventId}/${encodedTitle}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || "Event Details",
          text: "Check out this event!",
          url: sharePageUrl,
        });
      } else {
        await navigator.clipboard.writeText(sharePageUrl);
        alert("✅ Event link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  return (
    <div
      onClick={handleShare}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-center"
      title="Share Event"
    >
      <Share2 className="w-5 h-5" />
    </div>
  );
}
