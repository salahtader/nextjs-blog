import React from 'react';
import Button from './Button';
export default function Header() {
  return (
    <header
    role="banner"
      className="h-[70vh] bg-cover bg-center z-40"
      style={{ backgroundImage: "url('./home.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 w-full h-full flex items-center justify-center flex-col">
      <h2 className="text-6xl md:text-8xl font-bold text-white">Blog</h2>

      <div role="separator" className="bg-gradient-to-t from-10% from-blue-500 to-transparent to-95% my-2 w-[2px] h-[100px] rounded-b-lg"></div>
       <Button role="link" label='Voir les articles' href="#content" />
      </div>
    </header>
  );
}
