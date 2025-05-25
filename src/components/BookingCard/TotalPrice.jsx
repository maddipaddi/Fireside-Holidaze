/**
 * Displays the total price in a styled paragraph.
 *
 * @component
 * @param {Object} props
 * @param {number} props.totalPrice - The total price to display.
 * @returns {JSX.Element} Rendered total price element.
 */

function TotalPrice({ totalPrice }) {
  return (
    <p className="mt-4 text-lg font-medium text-black">
      Total Price: ${totalPrice}
    </p>
  );
}
export default TotalPrice;
