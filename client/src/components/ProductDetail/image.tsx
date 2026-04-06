import React, { useState } from "react";

type ImageProps = {
  images: string[];
  alt: string;
};

const Image = ({ images, alt }: ImageProps) => {
  const validImages = images?.filter(Boolean) ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 text-sm text-gray-500 rounded">
        No image available
      </div>
    );
  }

  const handlePrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-64">
      <img
        src={validImages[currentIndex]}
        alt={`${alt} ${currentIndex + 1}`}
        className="w-full h-64 object-contain"
      />

      {validImages.length > 1 && (
        <>
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded shadow"
          >
            ‹
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 px-2 py-1 rounded shadow"
          >
            ›
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded">
            {currentIndex + 1} / {validImages.length}
          </div>
        </>
      )}
    </div>
  );
};

export default Image;
