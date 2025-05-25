import AvatarUploader from "./AvatarUploader";
import RoleToggleButtons from "./RoleToggleButtons";

/**
 * UserGreetingCard component displays a user's greeting, avatar, and role toggle options.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.user - The user object containing user details.
 * @param {string} props.user.name - The name of the user.
 * @param {Object} [props.user.avatar] - The user's avatar object.
 * @param {string} [props.user.avatar.alt] - The alt text for the user's avatar.
 * @param {boolean} props.user.venueManager - Indicates if the user is a venue manager.
 * @param {string} props.avatarUrl - The URL of the user's avatar image.
 * @param {Function} props.setAvatarUrl - Function to update the avatar URL.
 * @param {Function} props.onUpdateAvatar - Callback function when the avatar is updated.
 * @param {Function} props.onToggleRole - Callback function to toggle the user's role.
 *
 * @returns {JSX.Element} The rendered UserGreetingCard component.
 */

export default function UserGreetingCard({
  user,
  avatarUrl,
  setAvatarUrl,
  onUpdateAvatar,
  onToggleRole,
}) {
  return (
    <div className="relative w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl flex flex-col items-center m-4 px-4">
      <img
        src={avatarUrl || "/default-avatar.png"}
        alt={user.avatar?.alt || "Profile image"}
        className="w-32 h-32 rounded-full object-cover border-4 border-white absolute -top-16 z-10"
      />
      <div className="w-full bg-secondary p-6 rounded-t-lg rounded-b-lg shadow-lg mt-12">
        <h1 className="text-2xl font-semibold text-center mb-6 font-body text-white">
          Hi, {user.name}!
        </h1>
        <AvatarUploader avatarUrl={avatarUrl} onChange={setAvatarUrl} />
        <RoleToggleButtons
          onUpdate={onUpdateAvatar}
          onToggle={onToggleRole}
          isVenueManager={user.venueManager}
        />
      </div>
    </div>
  );
}
