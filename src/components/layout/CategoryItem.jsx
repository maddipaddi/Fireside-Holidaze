// components/CategoryItem.jsx
import React from "react";

function CategoryItem({ label, imgSrc, href, pathId }) {
  return (
    <div className="relative w-52 h-52">
      <svg
        viewBox="0 0 200 200"
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      >
        <defs>
          <path id={pathId} d="M 100,100 m -75,0 a 75,75 0 0,1 150,0" />
        </defs>
        <text
          fill="currentColor"
          fontSize="14"
          className="text-copy font-heading"
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {label.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <a href={href}>
        <img
          src={imgSrc}
          alt={`Icon showing category ${label}`}
          className="w-full h-full rounded-full object-cover"
        />
      </a>
    </div>
  );
}

export default CategoryItem;
