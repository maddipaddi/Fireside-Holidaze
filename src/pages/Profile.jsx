import AddVenue from "../components/AddVenue";
import ProfileVenues from "../components/ProfileVenues";

export default function Profile() {
  return (
    <div className="pt-16 dark:text-white">
      <h1>Profile</h1>
      <p>All the profile stuff will be here</p>
      <ProfileVenues />
      <AddVenue />
    </div>
  );
}
