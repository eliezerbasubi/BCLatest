import React from "react";
import VSadEmoji from "../../assets/vectors/VSadEmoji";

type Props = {
  className?: string;
};

const Web3NotSupport = ({ className }: Props) => {
  return (
    <div
      className={`h-full w-full flex flex-col justify-center items-center ${className}`}
    >
      <VSadEmoji />

      <p className="text-lg leading-5 font-medium text-gray-900 mb-3">
        Oops! Looks like your browser does not support Web3
      </p>

      <p className="text-gray-500 text-sm">
        Please move to a browser that support Web3
      </p>
    </div>
  );
};

export default Web3NotSupport;
