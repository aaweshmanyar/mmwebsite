import React from "react";

export default function ShareEventButton({ eventId, title }) {
  // Safely encode the title for use in the URL
  const encodedTitle = encodeURIComponent(title || "event");
  const shareUrl = `https://minaramasjid-eight.vercel.app/newsandevent/${eventId}/${encodedTitle}`;

  const handleShare = async () => {
    try {
      // Use native share if available
      if (navigator.share) {
        await navigator.share({
          title: title || "Event Details",
          text: "Check out this event!",
          url: shareUrl,
        });
      } else {
        // Fallback: Copy link to clipboard
        await navigator.clipboard.writeText(shareUrl);
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
