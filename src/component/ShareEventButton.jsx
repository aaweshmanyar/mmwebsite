import React from "react";

export default function ShareEventButton({ eventId, title }) {
  // Share preview page (HTML file with OG meta) instead of full route
  const sharePageUrl = `https://minaramasjid-eight.vercel.app/sharepages/event-123.html`;

  const handleShare = async () => {
    try {
      // Use native share if available
      if (navigator.share) {
        await navigator.share({
          title: title || "Event Details",
          text: "Check out this event!",
          url: sharePageUrl, // <-- ✅ Point to static share page
        });
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(sharePageUrl);
        alert("✅ Event link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
    >
      Share Event
    </button>
  );
}
