import { observer } from "mobx-react";
import { useState, useEffect } from "react";

export const CountdownAnimation = observer(
  ({ remainingTime }: { remainingTime: number }) => {
    const initialTime = 60;
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
      if (remainingTime === 0) {
        setTimeLeft(initialTime);
      } else {
        setTimeLeft(remainingTime);
      }
    }, [remainingTime]);

    useEffect(() => {
      const timer = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft((prevTime) => prevTime - 1);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [timeLeft]);

    const progress = Math.round(((initialTime - timeLeft) / initialTime) * 100); // Calculate the progress of the animation based on the remaining time

    return (
      <svg width="50" height="50">
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#000"
          strokeWidth="3"
          fill="transparent"
        />
        <circle
          cx="25"
          cy="25"
          r="20"
          stroke="#ff8b00"
          strokeWidth="3"
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={`${progress}, 100`}
          transform="rotate(0 25 25)"
        />
        <text x="25" y="30" textAnchor="middle">
          {timeLeft}
        </text>
      </svg>
    );
  }
);
