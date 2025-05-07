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

  const handleUpdate = async () => {
    if (!user) return;

    const token = localStorage.getItem("accessToken");
    const username = user.name;

    try {
      // 🔁 Oppdater avatar
      await updateAvatar(username, newAvatar, altText, token);

      // 💾 Lagre backup i localStorage per bruker
      localStorage.setItem(`backupAvatarUrl-${username}`, newAvatar);
      localStorage.setItem(`backupAvatarAlt-${username}`, altText);

      // 🔄 Hent ny profil fra API
      const refreshed = await fetchUserProfile(username, token);

      const fullUserData = {
        ...refreshed,
        accessToken: token,
      };

      setUser(fullUserData);
      localStorage.setItem("user", JSON.stringify(fullUserData));
      setUpdateTime(Date.now());

      console.log("✅ Avatar oppdatert og bekreftet!");
    } catch (error) {
      console.error("Feil ved oppdatering:", error);
    }
  };

  if (!user) return <div className="pt-16">Laster profil...</div>;

  return (
    <div className="pt-16 flex flex-col items-center dark:text-white">
      <h1 className="text-3xl font-bold mb-4">Profile</h1>

      <img
        src={`${user.avatar?.url}?t=${updateTime}`}
        alt={user.avatar?.alt || "Profilbilde"}
        key={user.avatar?.url}
        className="w-32 h-32 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 mb-4"
      />

      <div className="mb-6 w-full max-w-xs">
        <label className="block text-sm mb-1">Ny bilde-URL</label>
        <input
          type="text"
          value={newAvatar}
          onChange={(e) => setNewAvatar(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />

        <label className="block text-sm mt-3 mb-1">Alternativ tekst</label>
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          className="w-full p-2 border rounded text-black"
        />

        <button
          onClick={handleUpdate}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Oppdater profilbilde
        </button>
      </div>

      <AddVenue />
    </div>
  );
}
