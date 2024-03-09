import * as React from "react";
const ArrowLeftIcon = ({ size, color, props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M7.685 7.332A1 1 0 1 0 6.27 5.918l-4.666 4.665a2 2 0 0 0 0 2.829l4.668 4.668a1 1 0 0 0 1.415-1.414L4.022 13H22a1 1 0 1 0 0-2H4.017z"
      fill={color}
    />
  </svg>
);
export default ArrowLeftIcon;
