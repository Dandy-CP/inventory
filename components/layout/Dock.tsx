import React from 'react';
import { IconBuildingWarehouse, IconLogout } from '@tabler/icons-react';
import { useAuth } from '@/hooks';

const Dock = () => {
  const { signOut } = useAuth();

  return (
    <div className="dock desktop:hidden large:hidden xtraLarge:hidden">
      <button>
        <IconBuildingWarehouse />
        <span className="dock-label">Inventory</span>
      </button>

      <button
        onClick={() => {
          signOut();
        }}
      >
        <IconLogout />
        <span className="dock-label">Logout</span>
      </button>
    </div>
  );
};

export default Dock;
