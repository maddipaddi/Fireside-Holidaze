import React from "react";
import Searchbar from "../components/Searchbar";
import CategoryItem from "../components/CategoryItem";
import PopularCarousel from "../components/Carousel";

function Home() {
  return (
    <div className="bg-background dark:bg-darkbackground">
      <div className="pt-8">
        <Searchbar />
      </div>

      <div className="py-20 flex items-center justify-center px-4">
        <div className="relative bg-copy dark:bg-background text-background dark:text-copy w-full max-w-6xl rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg overflow-visible">
          <div className="flex flex-col items-start justify-center gap-4 w-full md:w-1/2 h-auto">
            <h1 className="font-heading text-3xl sm:text-4xl">
              Welcome to Holidaze!
            </h1>
            <h2 className="font-body text-lg sm:text-xl">
              Your forest retreat awaits
            </h2>
            <button className="font-body bg-background dark:bg-primary px-6 py-3 rounded-2xl shadow-md hover:bg-accent hover:text-copy dark:hover:bg-copy dark:hover:text-copy transition">
              <a
                href="/Venues"
                className="text-copy dark:text-background font-bold"
              >
                View all locations
              </a>
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/assets/zachary-kyra-derksen-unsplash.jpg"
              alt="Picture of a cozy cabin in the woods"
              className="w-60 sm:w-72 h-auto rounded-2xl md:-mb-28 shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
      <PopularCarousel />
      <div>
        <h1 className="font-heading text-3xl font-bold text-center py-8 dark:text-background">
          Categories
        </h1>
      </div>
      <div className="w-full max-w-5xl mx-auto flex flex-wrap justify-center gap-6 px-4">
        <CategoryItem
          label="Forest"
          imgSrc="/assets/cato-forest.png"
          href="/categories/forest"
          pathId="circleTopForest"
        />
        <CategoryItem
          label="Sea"
          imgSrc="/assets/cato-sea.png"
          href="/categories/sea"
          pathId="circleTopSea"
        />
        <CategoryItem
          label="Mountain"
          imgSrc="/assets/cato-mount.png"
          href="/categories/mountain"
          pathId="circleTopMountain"
        />
      </div>
    </div>
  );
}

export default Home;
