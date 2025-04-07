import React from "react";

type DescriptionProps = {
  text: string;
};

const Description: React.FC<DescriptionProps> = ({ text }) => (
  <p className="text-gray-600 text-sm line-clamp-2">{text}</p>
);

export default Description;
