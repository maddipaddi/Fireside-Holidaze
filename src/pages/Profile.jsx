import { useState, useContext } from "react";
import { updateAvatar } from "../utils/updateProfile.mjs";
import { fetchUserProfile } from "../utils/fetchUserProfile.mjs";
import AddVenue from "../components/AddVenue";
import { UserContext } from "../components/UserContext";

export default function Profile() {
  const { user, setUser } = useContext(UserContext);
  const [newAvatar, setNewAvatar] = useState(user?.avatar?.url || "");
  const [altText, setAltText] = useState(user?.avatar?.alt || "");
  const [updateTime, setUpdateTime] = useState(Date.now());
  const [successMessage, setSuccessMessage] = useState("");

  const handleUpdate = async () => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");
    const username = user.name;

    try {
      await updateAvatar(username, newAvatar, altText, token);

      localStorage.setItem(`backupAvatarUrl-${username}`, newAvatar);
      localStorage.setItem(`backupAvatarAlt-${username}`, altText);

      const refreshed = await fetchUserProfile(username, token);

      const fullUserData = {
        ...refreshed,
        accessToken: token,
      };

      setUser(fullUserData);
      localStorage.setItem("user", JSON.stringify(fullUserData));
      setUpdateTime(Date.now());

      setNewAvatar("");
      setAltText("");
      setSuccessMessage("Profile picture updated!");

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error updating avatar:", error);
    }
  };

  if (!user) return <div className="pt-16">Loading profile...</div>;

  return (
    <div className="pt-20 flex flex-col items-center">
      <div className="relative w-full max-w-md flex flex-col items-center m-12">
        <img
          src={`${user.avatar?.url}?t=${updateTime}`}
          alt={user.avatar?.alt || "Profile picture"}
          key={user.avatar?.url}
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
              value={newAvatar}
              onChange={(e) => setNewAvatar(e.target.value)}
              className="font-body w-full px-3 py-2 bg-white text-black border rounded focus:outline-none focus:ring focus:border-copy"
              alt="Profile picture"
              placeholder="Paste image URL here"
            />
          </div>

          <div className="text-center -mx-6 -mb-6 bg-primary dark:bg-background p-4 rounded-b-lg">
            <button
              onClick={handleUpdate}
              className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-full mb-2"
            >
              Update profile picture
            </button>
            <button className="bg-background dark:bg-primary text-copy dark:text-background font-body font-bold px-8 py-2 rounded shadow hover:bg-accent/50 dark:hover:bg-copy hover:text-white transition cursor-pointer w-full">
              Switch to venue manager
            </button>

            {successMessage && (
              <p className="mt-4 text-sm text-copy font-body">
                {successMessage}
              </p>
            )}
          </div>
        </div>
      </div>

      <AddVenue />
    </div>
  );
}
