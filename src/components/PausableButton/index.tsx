import React, { useCallback } from "react";
import { VPause, VResume } from "../../assets/vectors/VRequestActions";

type Props = {
  paused?: boolean;
  onClick?: () => void;
};

const PausableButton = ({ paused = false, onClick }: Props) => {
  const getText = useCallback(() => {
    if (paused) {
      return "Resume Request";
    }
    return "Pause Request";
  }, [paused]);

  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center space-x-6 w-full md:w-80 lg:w-96 text-center border-2 border-white bg-black hover:bg-white hover:text-black p-4 py-5 rounded-2xl"
    >
      {(paused && <VResume />) || <VPause />}
      <p className="font-medium text-xl leading-tight">{getText()}</p>
    </button>
  );
};

export default PausableButton;
