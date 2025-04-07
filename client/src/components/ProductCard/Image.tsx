import React from "react";

type ImageProps = {
  src: string;
  alt: string;
};

const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <img src={src} alt={alt} className="w-full h-64 object-contain" />
);

export default Image;
