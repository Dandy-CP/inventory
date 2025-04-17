import React from 'react';
import Link from 'next/link';
import { IconProps, Icon } from '@tabler/icons-react';

interface MenuProps {
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  label: string;
  link: string;
  pathname?: string;
}

const Menu = ({ label, link, Icon, pathname }: MenuProps) => {
  return (
    <Link
      href={link}
      className={`flex flex-row items-center p-3 hover:bg-gray-100 rounded-md ${
        pathname === link ? 'bg-gray-100' : ''
      }`}
    >
      <Icon size={24} strokeWidth={1.25} />
      <span className="font-semibold ml-2">{label}</span>
    </Link>
  );
};

export default Menu;
