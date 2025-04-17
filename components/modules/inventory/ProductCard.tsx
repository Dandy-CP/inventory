import React from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { IconTrash } from '@tabler/icons-react';
import { Button } from '@/components/elements';
import { Inventory } from '@/types/inventory/inventory.types';
import { DeleteInventory } from '@/service/API/inventory/inventory.mutation';

interface Props {
  inventory: Inventory;
  refetch: () => void;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  setIsUpdateProductOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductCard = ({
  inventory,
  refetch,
  setSelectedID,
  setIsUpdateProductOpen,
}: Props) => {
  const { productName, quantity, price, imageUrl, id, description } = inventory;

  const { mutateAsync, isPending } = DeleteInventory({
    onSuccess() {
      refetch();
      toast.success('Success Delete Inventory');
    },
    onError() {
      toast.error('Error On Delete Inventory');
    },
  });

  const handleDeleteInventory = async () => {
    await mutateAsync({ inventoryID: id });
  };

  return (
    <div className="w-full border border-gray-200 rounded-md flex flex-row justify-between phone:flex-col phone:justify-center">
      <div className="flex flex-row gap-3 phone:flex-col">
        <Image
          src={imageUrl}
          alt=""
          width="0"
          height="0"
          sizes="100vw"
          className="bg-gray-300 rounded-bl-md rounded-tl-md object-contain w-[250px] h-[150px] phone:w-full phone:rounded-none"
        />

        <div className="flex flex-col justify-evenly phone:m-5">
          <p className="font-semibold text-gray-400">{productName}</p>

          <p>
            Price:
            {price.toLocaleString('id-ID', {
              style: 'currency',
              currency: 'IDR',
            })}
          </p>

          <p>Quantity: {quantity}</p>

          <p>{description}</p>
        </div>
      </div>

      <div className="phone:flex phone:flex-col phone:gap-3 phone:p-3">
        <Button
          variant="outline"
          className="m-5 w-[150px] phone:m-0 phone:w-full"
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            setSelectedID(id);
            setIsUpdateProductOpen(true);
          }}
        >
          Edit
        </Button>

        <Button
          className="m-5 w-[150px] bg-red-500 phone:m-0 phone:w-full"
          IconComponents={() => <IconTrash />}
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            handleDeleteInventory();
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
