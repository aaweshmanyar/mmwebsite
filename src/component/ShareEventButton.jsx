import React from "react";

export default function ShareEventButton({ eventId, title }) {
  // Only include the event ID (no title in path)
  const sharePageUrl = `https://mm-server-tbbo.onrender.com/share/event/${eventId}`;

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
    <button
      onClick={handleShare}
      className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
    >
      Share Event
    </button>
  );
}
