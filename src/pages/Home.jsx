import React from "react";
import Searchbar from "../components/layout/Searchbar";

function Home() {
  return (
    <div className="bg-background dark:bg-darkbackground min-h-screen">
      <div className="pt-8">
        <Searchbar />
      </div>
      <div className="py-20 flex items-center justify-center">
        <div className="relative bg-copy dark:bg-background text-background dark:text-copy w-3/4 rounded-2xl p-8 flex flex-row items-center justify-between gap-8 shadow-lg overflow-visible">
          {/* text */}
          <div className="flex flex-col items-start justify-center gap-4 w-1/2 ml-20 h-60">
            <h1 className="font-heading text-3xl">Welcome to Holidaze!</h1>
            <h2 className="font-body text-lg">Your forest retreat awaits</h2>
            <button className="font-body bg-background dark:bg-primary px-6 py-3 rounded-2xl shadow-md hover:bg-accent hover:text-copy dark:hover:bg-copy dark:hover:text-copy transition">
              <a
                href="/Venues"
                className="text-copy dark:text-background font-bold"
              >
                View all locations
              </a>
            </button>
          </div>

          {/* Image */}
          <div className="w-1/2 flex justify-center">
            <img
              src="/assets/zachary-kyra-derksen-unsplash.jpg"
              alt="Picture of a cozy cabin in the woods"
              className="w-60 h-auto rounded-2xl -mb-28 shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
