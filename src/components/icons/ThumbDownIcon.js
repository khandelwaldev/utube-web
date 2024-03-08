import * as React from "react";
const ThumbDownIcon = ({ size, color, props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    // fill={color}
    {...props}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <title />
      <g id="Complete">
        <g id="thumbs-down">
          <path
            d="M7.3,12.6,10.1,21a.6.6,0,0,0,.8.3l1-.5a2.6,2.6,0,0,0,1.4-2.3V14.6h6.4a2,2,0,0,0,1.9-2.5l-2-8a2,2,0,0,0-1.9-1.5H4.3a2,2,0,0,0-2,2v6a2,2,0,0,0,2,2h3V2.6"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
          />
        </g>
      </g>
    </g>
  </svg>
);
export default ThumbDownIcon;
