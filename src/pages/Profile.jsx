import { useState, useEffect, useContext } from "react";
import AddVenue from "../components/AddVenue";
import ProfileVenues from "../components/ProfileVenues";
import { UserContext } from "../components/context/UserContext";
import { updateProfile } from "../utils/updateProfile.mjs";
import VenueManagerBookings from "../components/VenueManBookings";
import CustomerBookings from "../components/CustomerBookings";
import { handleError } from "../utils/errorHandler.mjs";
import { showSuccessMessage } from "../utils/successMessage.mjs";

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
    if (user && user.avatar?.url) {
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
    <div className="mt-26 flex flex-col items-center gap-10">
      <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center m-4 px-4">
        <img
          src={newAvatarUrl || "/default-avatar.png"}
          alt={user.avatar?.alt || "Profile image"}
          className="w-32 h-32 rounded-full object-cover border-4 border-white absolute -top-16 z-10"
        />
        <div className="w-full bg-secondary p-6 rounded-t-lg rounded-b-lg shadow-lg mt-12">
          <h1 className="text-2xl font-semibold text-center mb-6 font-body text-white">
            Hi, {user.name}!
          </h1>
          <div className="mb-6">
            <label
              htmlFor="profile-img-url"
              className="block text-sm font-semibold font-body text-white mb-1"
            >
              Change profile picture
            </label>
            <input
              name="profile-img-url"
              id="profile-img-url"
              type="text"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              className="font-body w-full px-3 py-2 bg-white text-black border rounded focus:outline-none focus:ring focus:border-copy"
              placeholder="https://url.com/image.jpg"
            />
          </div>

          <div className="text-center -mx-6 -mb-6 bg-primary dark:bg-background p-4 rounded-b-lg">
            <button
              onClick={handleUpdateAvatar}
              className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-3/4 mb-4"
            >
              Update profile picture
            </button>
            <button
              onClick={handleToggleVenueManager}
              className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-3/4"
            >
              {user.venueManager
                ? "Switch to customer"
                : "Switch to venue manager"}
            </button>
          </div>
        </div>
      </div>

      {!user.venueManager && <CustomerBookings />}
      {user.venueManager && (
        <>
          <VenueManagerBookings />
          <ProfileVenues />
          <AddVenue />
        </>
      )}
    </div>
  );
}
