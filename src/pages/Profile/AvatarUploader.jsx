/**
 * AvatarUploader component allows users to change their profile picture by entering an image URL.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.avatarUrl - The current URL of the user's avatar image.
 * @param {function} props.onChange - Callback function called when the avatar URL input changes. Receives the new URL as a string argument.
 * @returns {JSX.Element} The rendered AvatarUploader component.
 */

export default function AvatarUploader({ avatarUrl, onChange }) {
  return (
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
        value={avatarUrl}
        onChange={(e) => onChange(e.target.value)}
        className="font-body w-full px-3 py-2 bg-white text-black border rounded focus:outline-none focus:ring focus:border-copy"
        placeholder="https://url.com/image.jpg"
      />
    </div>
  );
}
