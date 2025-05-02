import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

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
