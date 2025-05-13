import { useState, useContext } from "react";
import AddVenue from "../components/AddVenue";
import ProfileVenues from "../components/ProfileVenues";
import { UserContext } from "../components/context/UserContext";
import { updateProfile } from "../utils/updateProfile.mjs";
import VenueManagerBookings from "../components/VenueManBookings";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [newAvatarUrl, setNewAvatarUrl] = useState(user.avatar?.url || "");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleUpdateAvatar() {
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
      setSuccessMessage("Profile picture updated!");

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to update avatar:", error);
    }
  }

  async function handleToggleVenueManager() {
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

      setSuccessMessage(
        newStatus
          ? "You're now a venue manager!"
          : "You've switched to customer.",
      );

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Failed to toggle venueManager:", error);
    }
  }

  return (
    <div className="pt-20 flex flex-col items-center gap-10">
      <div className="relative w-full max-w-md flex flex-col items-center m-12">
        <img
          src={newAvatarUrl || user.avatar.url}
          alt={user.avatar.alt}
          className="w-32 h-32 rounded-full object-cover border-4 border-white absolute -top-16 z-10"
        />
        <div className="w-full bg-secondary p-6 rounded-t-lg rounded-b-lg shadow-lg mt-12">
          <h1 className="text-2xl font-semibold text-center mb-6 font-body text-white">
            Hi, {user.name}!
          </h1>
          <div className="mb-6">
            <label className="block text-sm font-semibold font-body text-white mb-1">
              Change profile picture
            </label>
            <input
              type="text"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              className="font-body w-full px-3 py-2 bg-white text-black border rounded focus:outline-none focus:ring focus:border-copy"
              alt="Profile picture"
              placeholder="Paste image URL here"
            />
          </div>

          <div className="text-center -mx-6 -mb-6 bg-primary dark:bg-background p-4 rounded-b-lg">
            <button
              onClick={handleUpdateAvatar}
              className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-full mb-2"
            >
              Update profile picture
            </button>
            <button
              onClick={handleToggleVenueManager}
              className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-full"
            >
              {user.venueManager
                ? "Switch to customer"
                : "Switch to venue manager"}
            </button>
            {successMessage && (
              <p className="mt-4 text-sm text-copy font-body">
                {successMessage}
              </p>
            )}
          </div>
        </div>
      </div>
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
