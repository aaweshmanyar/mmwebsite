import React from "react";
import { Share2 } from "lucide-react"; // Make sure you have: npm install lucide-react

export default function ShareButton({ type = "event", id, title }) {
  const encodedTitle = encodeURIComponent(title || type);
  const shareUrl = `https://mm-server-tbbo.onrender.com/share/${type}/${id}/${encodedTitle}`;

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: title || `${type} Details`,
          text: `Check out this ${type}!`,
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        alert(`✅ ${type.charAt(0).toUpperCase() + type.slice(1)} link copied to clipboard!`);
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  return (
    <div
      onClick={handleShare}
      className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg cursor-pointer transition duration-300 ease-in-out flex items-center justify-center"
      title={`Share ${type}`}
    >
      <Share2 className="w-5 h-5" />
    </div>
  );
}
