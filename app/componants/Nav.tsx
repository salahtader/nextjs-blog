"use client";
import React from 'react';
import Link from "next/link";


export default function Nav() {
  const menu = [
    { name: "Home", path: "/" },
    { name: "Nouveau Post", path: "/create" },
    { name: "Se Connecter", path: "/signInAndUp" },
  ];
  return (
    <div className="absolute text-gray-500 z-100 top-0 left-0 flex justify-between items-center w-full p-3 px-5 border-b border-b-blue-500 bg-white">
      <ul className="flex items-center gap-5 ">
        {menu.map((item) => (
          <li key={item.name} className="text-gray-500 hover:text-blue-700">
            <Link key={item.path} href={item.path}>
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
