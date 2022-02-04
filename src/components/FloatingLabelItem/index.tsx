import React from "react";

type Props = {
  label: string;
  item?: string | number | null;
};

const FloatingLabelItem = ({ label, item }: Props) => {
  return (
    <div className="w-full bg-light-gray rounded-2xl p-4 mb-4">
      <p className="text-xs font-bold text-gray-thick">{label}</p>
      <p className="text-black font-bold text-xl">{item}</p>
    </div>
  );
};

export default FloatingLabelItem;
