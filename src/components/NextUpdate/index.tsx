import React, { useEffect, useState } from "react";

type Props = {};

const NextUpdate = (props: Props) => {
  const [countdown, setCountdown] = useState(5);

  //   @TODO - Start the timer if the block is loaded successfully
  useEffect(() => {
    const timer = setInterval(() => {
      const counter = countdown - 1;
      setCountdown(counter);
    }, 1000);

    if (countdown < 0) {
      clearInterval(timer);
      setCountdown(5);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  return <p className="text-right mb-3">Next update in: {countdown}s</p>;
};

export default NextUpdate;
