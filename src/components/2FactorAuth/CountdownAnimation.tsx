import { observer } from "mobx-react";

export const CountdownAnimation = observer(
  ({ remainingTime }: { remainingTime: number }) => {
    const progress = Math.round(((60 - remainingTime) / 60) * 100); // Calculate the progress of the animation based on the remaining time
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
      </svg>
    );
  }
);
