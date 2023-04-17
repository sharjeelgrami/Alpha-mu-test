import { globalCss } from "./stitches.config";

export const globalStyles = globalCss({
  html: {
    boxSizing: "border-box",
  },
  "*, *::after, *::before": {
    boxSizing: "inherit",
  },
  body: {
    fontFamily: "$sans",
    backgroundColor: "$bgColor",
    color: "$text",
  },
});
