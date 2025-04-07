import React from "react";

type TitleProps = {
  text: string;
};

const Title: React.FC<TitleProps> = ({ text }) => (
  <h2 className="text-lg font-semibold truncate">{text}</h2>
);

export default Title;
