import React, { useEffect, useRef } from "react";
import { render, cancel } from "timeago.js";

const TimeAgo = () => {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    const node = ref.current;
    render(ref.current as HTMLElement);

    return () => {
      cancel(node as HTMLElement);
    };
  }, [ref]);

  return (
    <div
      className="timeago"
      // @ts-ignore
      ref={ref}
      dateTime={new Date().toISOString()}
    ></div>
  );
};

export default TimeAgo;
