"use client"

import Form from "components/Form";


export default function createPage() {
  return (
    <div className="w-full h-screen grid grid-cols-1 lg:grid-cols-[3fr_1fr]">
  <div className="p-20 pl-50 bg-red-600 flex flex-col items-start justify-center">
    <h2 className="text-[30px] text-gray-950 font-black mb-8">Ajouter un post</h2>
    <Form />
  </div>
  <div className="hidden lg:flex items-center justify-center bg-red-900">
    <img src='./home.jpg' alt="Home" className="w-full h-full object-cover" />
  </div>
</div>

  
  );
}
