import React from "react";

type PriceProps = {
  amount: number;
};

const Price: React.FC<PriceProps> = ({ amount }) => (
  <p className="text-green-600 font-bold text-sm">${amount.toFixed(2)}</p>
);

export default Price;
