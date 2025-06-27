import React from "react";

export default function ShareEventButton({ eventId, title }) {
  const shareUrl = `https://yourdomain.com/fullevent/${eventId}`;

  const handleShare = async () => {
    try {
      // Native share if supported
      if (navigator.share) {
        await navigator.share({
          title: title || "Event Details",
          text: "Check out this event!",
          url: shareUrl,
        });
      } else {
        // Fallback - copy link
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
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
