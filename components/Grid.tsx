'use client';

import { useState } from 'react';

export default function Grid({
  grid,
  onClick,
}: {
  grid: { type: string; src: string }[];
  onClick: (type: string) => () => void;
}) {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-grid mx-auto">
      {grid.map((image, imageIndex) => {
        const bgActive = image.type === 'win' ? 'bg-green-500' : 'bg-red-500';
        const active =
          activeImageIndex === imageIndex ? 'opacity-80' : 'opacity-0';

        return (
          <button
            type="button"
            key={imageIndex}
            onClick={onClick(image.type)}
            onMouseUp={() => setActiveImageIndex(null)}
            onTouchEnd={() => setActiveImageIndex(null)}
            onMouseDown={() => setActiveImageIndex(imageIndex)}
            onTouchStart={() => setActiveImageIndex(imageIndex)}
            className="relative rounded-md overflow-hidden"
          >
            <p
              className={`z-10 w-full h-full absolute ${active} ${bgActive}`}
            />
            <img
              width={50}
              height={50}
              src={image.src}
              alt={image.type}
              className="w-full h-full aspect-square object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
