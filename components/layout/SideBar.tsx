import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { IconBuildingWarehouse, IconLogout } from '@tabler/icons-react';
import Menu from './partials/Menu';
import { useAuth } from '@/hooks';

const SideBar = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const { pathname } = router;

  const menu = [
    {
      label: 'Inventory',
      link: '/',
      Icon: IconBuildingWarehouse,
    },
  ];

  return (
    <div className="h-screen w-[280px] p-5 sticky top-0 border-r-2 border-gray-200 bg-white flex flex-col justify-between tablet:hidden phone:hidden">
      <div>
        <Image src="/logoName.svg" alt="" width={123} height={50} />
        <div className="flex flex-col gap-5 mt-10">
          {menu.map((value) => (
            <Menu key={value.label} pathname={pathname} {...value} />
          ))}
        </div>
      </div>

      <button
        className="flex flex-row items-center p-3 hover:bg-gray-100 rounded-md cursor-pointer"
        onClick={() => {
          signOut();
        }}
      >
        <IconLogout size={24} strokeWidth={1.25} />
        <span className="font-semibold ml-2">Logout</span>
      </button>
    </div>
  );
};

export default SideBar;
