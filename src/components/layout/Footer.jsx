import React from "react";

function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-background dark:bg-darkbackground">
      <img
        src="/assets/footer-light.png"
        alt="Footer lightmode"
        className="w-full h-auto object-cover block dark:hidden"
      />
      <img
        src="/assets/footer-dark.png"
        alt="Footer darkmode"
        className="w-full h-auto object-cover hidden dark:block"
      />

      {/* Lenker oppå bilde */}
      <div className="absolute inset-0 flex items-center justify-center text-white dark:text-copy px-4 text-sm sm:text-base z-10 translate-y-4 sm:translate-y-8">
        <div className="flex w-full max-w-xs justify-between items-center font-body">
          <p>&copy; {new Date().getFullYear()} Holidaze</p>
          <a
            href="/terms"
            className="pointer-events-auto hover:underline dark:text-copy font-body"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="pointer-events-auto hover:underline dark:text-copy font-body"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
