import { Link } from "react-router-dom";

/**
 * Renders a circular category item with a curved label and an image.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label to display along the SVG path.
 * @param {string} props.imgSrc - The source URL for the category image.
 * @param {string} props.to - The route path to navigate to when the image is clicked.
 * @param {string} props.pathId - The unique ID for the SVG path used by the textPath.
 * @returns {JSX.Element} The rendered category item component.
 */

function CategoryItem({ label, imgSrc, to, pathId }) {
  return (
    <>
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

        <Link to={to}>
          <img
            src={imgSrc}
            alt={`Icon showing category ${label}`}
            loading="lazy"
            className="w-full h-full rounded-full object-cover"
          />
        </Link>
      </div>
    </>
  );
}

export default CategoryItem;
