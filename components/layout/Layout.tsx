import React from 'react';
import SideBar from './SideBar';
import Header from './Header';
import Dock from './Dock';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-row">
        <SideBar />

        <div className="flex flex-col w-full bg-[#F0F1F3]">
          <Header />

          <div className="p-8 phone:p-3">{children}</div>
        </div>
      </div>

      <Dock />
    </div>
  );
};

export default Layout;
