import * as React from "react";
const LogoIcon = ({ size, props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g strokeWidth={0} />
    <g strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M27 4H5a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3"
      fill="#B71C1C"
    />
    <path d="M25 24H7a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2" fill="#EEE" />
    <path
      d="M19 25a1 1 0 0 1-1-1v-2a1 1 0 0 1 2 0v2a1 1 0 0 1-1 1m1.45-12.33-7-3.5a1 1 0 0 0-1.45.89v7.88a1 1 0 0 0 .52.87.9.9 0 0 0 .48.13 1 1 0 0 0 .53-.15l7-4.38a1 1 0 0 0-.08-1.74"
      fill="#EEE"
    />
    <path d="M5 4a3 3 0 0 0-3 3v18a3 3 0 0 0 3 3h11V4z" fill="#E53935" />
    <path d="M7 22a1 1 0 0 0 0 2h9v-2z" fill="#FAFAFA" />
    <path
      d="M13.45 9.17a1 1 0 0 0-1.45.89v7.88a1 1 0 0 0 .52.87.9.9 0 0 0 .48.13 1 1 0 0 0 .53-.15L16 17.24v-6.8z"
      fill="#FFEBEE"
    />
  </svg>
);
export default LogoIcon;
