import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";

import AddVenue from "../../components/AddVenue";
import ProfileVenues from "../../components/ProfileVenues";
import CustomerBookings from "../../components/CustomerBookings";
import VenueManagerBookings from "../../components/VenueManagerBookings/";
import { UserContext } from "../../components/context/UserContext";
import { updateProfile } from "../../utils/updateProfile.mjs";
import { handleError } from "../../utils/errorHandler.mjs";
import { showSuccessMessage } from "../../utils/successMessage.mjs";

import UserGreetingCard from "./UserGreetingCard";

/**
 * Profile page component for displaying and managing the user's profile.
 *
 * - Shows user information and allows updating the profile avatar.
 * - Allows toggling between customer and venue manager roles.
 * - Displays bookings and venues based on the user's role.
 *
 * @component
 * @returns {JSX.Element} The rendered profile page.
 *
 * @example
 * // Usage in a route
 * <Route path="/profile" element={<Profile />} />
 */

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [newAvatarUrl, setNewAvatarUrl] = useState("");

  useEffect(() => {
    if (user?.avatar?.url) {
      setNewAvatarUrl(user.avatar.url);
    }
  }, [user]);

  async function handleUpdateAvatar() {
    if (!user) return;

    try {
      const response = await updateProfile(user.name, {
        avatar: {
          url: newAvatarUrl,
          alt: `${user.name}'s profile image`,
        },
      });

      const updatedUser = {
        ...response.data,
        accessToken: user.accessToken,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      showSuccessMessage("Profile picture updated!");
    } catch (error) {
      handleError(error);
    }
  }

  async function handleToggleVenueManager() {
    if (!user) return;

    try {
      const newStatus = !user.venueManager;
      const response = await updateProfile(user.name, {
        venueManager: newStatus,
      });

      const updatedUser = {
        ...response.data,
        accessToken: user.accessToken,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      showSuccessMessage(
        newStatus
          ? "You're now a venue manager!"
          : "You've switched to customer.",
      );
    } catch (error) {
      handleError(error);
    }
  }

  if (!user) {
    return (
      <p className="pt-20 text-center text-lg font-body">Loading profile...</p>
    );
  }

  return (
    <>
      <Helmet>
        <title>Profile | Holidaze</title>
        <meta
          name="description"
          content="View your profile page and see the cabins you host and/or the cabins you've booked."
        />
        <meta property="og:title" content="Fireside Holidaze - Profile" />
        <meta
          property="og:description"
          content="View your profile page and see the cabins you host and/or the cabins you've booked."
        />
        <meta
          property="og:image"
          content="https://fireside-holidaze.netlify.app/assets/zachary-kyra-derksen-unsplash.jpg"
        />
        <meta
          property="og:url"
          content="https://fireside-holidaze.netlify.app/"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mt-26 flex flex-col items-center gap-10">
        <UserGreetingCard
          user={user}
          avatarUrl={newAvatarUrl}
          setAvatarUrl={setNewAvatarUrl}
          onUpdateAvatar={handleUpdateAvatar}
          onToggleRole={handleToggleVenueManager}
        />

        {!user.venueManager && <CustomerBookings />}
        {user.venueManager && (
          <>
            <VenueManagerBookings />
            <ProfileVenues />
            <AddVenue />
          </>
        )}
      </div>
    </>
  );
}
