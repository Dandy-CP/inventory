import React from 'react';

const Header = () => {
  return (
    <div className="w-full h-[82px] p-5 border-b-1 border-gray-200 bg-white flex justify-end sticky top-0 z-50 tablet:hidden phone:hidden">
      <div className="bg-gray-400 w-10 h-10 rounded-full" />
    </div>
  );
};

export default Header;
