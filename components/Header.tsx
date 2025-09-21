import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-white/10 backdrop-blur-md p-4 border-b border-white/20 sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center">
        <span role="img" aria-label="sapling" className="text-2xl mr-3">🌱</span>
        <h1 className="text-xl md:text-2xl font-extrabold text-white tracking-wide">
          Growing Up
        </h1>
      </div>
    </header>
  );
};

export default Header;
