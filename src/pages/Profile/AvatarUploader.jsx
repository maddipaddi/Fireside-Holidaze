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
