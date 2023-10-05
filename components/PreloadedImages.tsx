'use client';

export default function PreloadedImages({
  onLoad,
  listSrc,
}: {
  listSrc: string[];
  onLoad: () => void;
}) {
  const preloadedImages = listSrc.map((src, i) => (
    <img
      alt=""
      key={i}
      src={src}
      width={50}
      height={50}
      loading="eager"
      onLoad={onLoad}
    />
  ));

  return <div className="absolute hidden">{preloadedImages}</div>;
}
