import * as React from "react";
const MenuDotsIcon = ({ size, color, props }) => (
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
      d="M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-7 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default MenuDotsIcon;
