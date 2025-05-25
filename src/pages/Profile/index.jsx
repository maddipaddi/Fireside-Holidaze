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
 * Profile component displays and manages the user's profile information.
 *
 * Features:
 * - Shows the user's avatar, name, and allows updating the profile picture.
 * - Allows toggling between "customer" and "venue manager" roles.
 * - Displays different components based on the user's role:
 *   - CustomerBookings for customers.
 *   - VenueManagerBookings, ProfileVenues, and AddVenue for venue managers.
 *
 * State:
 * - `newAvatarUrl` (string): Holds the URL for the new avatar image.
 *
 * Context:
 * - Uses `UserContext` to access and update the current user.
 *
 * Side Effects:
 * - Updates `newAvatarUrl` when the user or their avatar changes.
 *
 * Methods:
 * - `handleUpdateAvatar`: Updates the user's avatar URL.
 * - `handleToggleVenueManager`: Toggles the user's venue manager status.
 *
 * UI:
 * - Shows loading state if user data is not available.
 * - Provides input for avatar URL and buttons for updating profile and toggling role.
 *
 * @component
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
