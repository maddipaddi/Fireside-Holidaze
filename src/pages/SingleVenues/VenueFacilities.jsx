import { Wifi, Car, CookingPot, Dog } from "lucide-react";

const facilityMap = {
  wifi: { label: "Wi-Fi", icon: <Wifi /> },
  parking: { label: "Parking", icon: <Car /> },
  breakfast: { label: "Breakfast included", icon: <CookingPot /> },
  pets: { label: "Pets allowed", icon: <Dog /> },
};

/**
 * Renders a list of available venue facilities based on the provided metadata.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.meta - An object containing facility keys with boolean values indicating availability.
 * @returns {JSX.Element} A section displaying available facilities with icons and labels.
 */

function VenueFacilities({ meta }) {
  return (
    <>
      <section>
        <h3 className="text-center font-heading">Facilities</h3>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto text-center pt-4 pb-8 px-6">
          {Object.entries(meta)
            .filter(([_, value]) => value)
            .map(([key]) => (
              <div
                key={key}
                className="flex items-center gap-2 justify-center bg-background text-copy p-2 rounded"
              >
                {facilityMap[key]?.icon}
                <span>{facilityMap[key]?.label}</span>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default VenueFacilities;
