import React from 'react'

import background from "../../../assets/images/background.jpg"

export const Hero = () => {
  return (
    <section
      className="flex flex-col lg:flex-row items-center justify-center h-screen  bg-center z-0"
      style={{
        backgroundImage: `url(${background})`
      }}
    >
      <div className="text-center lg:text-left bg-black bg-opacity-0 p-10 rounded-lg my-0 ">
        <h1 className="text-6xl font-bold text-white">
          Find Your Forever Friend
        </h1>
        <p className="text-2xl text-white my-7 px-1">
          PetAdopt connects loving homes with pets in need. Discover your perfect companion and give a deserving animal a second chance at happiness.
        </p>

      </div>
    </section>
  );
};


