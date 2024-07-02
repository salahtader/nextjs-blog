import React from 'react';

type ButtonProps = {
    role:string;
  label: string;
  href: string    //() => void;
};

const Button: React.FC<ButtonProps> = ({ label, href }) => {
  return  <a href={href} className="bg-blue-500 hover:bg-blue-700 p-2 rounded-md text-white font-bold">{label}</a>
};

export default Button;
//   <button href={onClick}>{label}</button>;
