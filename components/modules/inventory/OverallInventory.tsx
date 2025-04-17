import React from 'react';
import { Card } from '@/components/elements';

interface Props {
  totalProduct: number;
}

const OverallInventory = ({ totalProduct }: Props) => {
  return (
    <Card className="p-5 mb-5">
      <p className="text-xl font-semibold">Overall Inventory</p>

      <div className="mt-5">
        <p className="text-[#E19133] font-semibold">Total Products</p>

        <div className="flex flex-row gap-8 mt-3">
          <div>
            <p className="font-semibold">{totalProduct}</p>
            <p className="text-gray-400 text-sm">Last 7 days</p>
          </div>

          <div>
            <p className="font-semibold">Rp 0</p>
            <p className="text-gray-400 text-sm">Revenue</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default OverallInventory;
