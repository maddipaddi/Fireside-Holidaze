import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

/**
 * Layout component that provides the main structure for the application.
 * It includes a header, a main content area for nested routes, and a footer.
 *
 * @component
 * @returns {JSX.Element} The layout structure with header, main content, and footer.
 */

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-darkbackground">
      <Header />
      <main className="flex-grow pt-10 md:pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
