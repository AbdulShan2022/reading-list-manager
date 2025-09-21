import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-600 text-white py-2 mt-auto">
      <div className="container sm:flex justify-center mx-auto px-4 text-center text-sm">
        <p>Reading List Manager by Abdul Rahman.</p>
        <p>&nbsp;All rights reserved © {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
