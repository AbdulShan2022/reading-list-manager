import React from "react";

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 flex flex-col py-2 sm:mb-4 bg-blue-600 text-white">
      <h1 className="text-3xl font-bold text-center">Reading List Manager</h1>
      <p className="text-center">Organize your reading journey</p>
    </header>
  );
};
