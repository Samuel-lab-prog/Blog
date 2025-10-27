type ImageProps = {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
};

export default function Image({
  src,
  alt,
  caption,
  className,
}: ImageProps) {
  return (
    <figure className={className}>
      <img src={src} alt={alt} />
      {caption && (
        <figcaption className="text-white text-xs italic text-center">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
