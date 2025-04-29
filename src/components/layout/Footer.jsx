export default function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} Holidaze</p>
      <a href="/Terms">Terms and Conditions</a>
      <a href="/Privacy">Privacy Policy</a>
    </footer>
  );
}
