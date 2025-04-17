import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Button, Input } from '@/components/elements';
import uploadHandler from '@/utils/uploadHandler';
import { InventoryBody } from '@/types/inventory/inventory.types';
import { UpdateInventory } from '@/service/API/inventory/inventory.mutation';
import { GetDetailInventory } from '@/service/API/inventory/inventory.query';
import { ResponseCategory } from '@/types/category/category.types';

interface Props {
  selectedID: string;
  listCategory: ResponseCategory[];
  onClose: () => void;
  refetch: () => void;
}

const UpdateInventoryContent = ({
  listCategory,
  selectedID,
  onClose,
  refetch,
}: Props) => {
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ''
  );

  const { data: inventory } = GetDetailInventory(
    { id: selectedID },
    { queryKey: [selectedID] }
  );

  const detailInventory = inventory?.data;

  const { mutateAsync, isPending } = UpdateInventory(
    { id: selectedID },
    {
      onSuccess() {
        toast.success('Success Update Inventory');

        refetch();
        onClose();
      },
      onError() {
        toast.error('Error On Update Inventory');
      },
    }
  );

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as InventoryBody;

    if (imageFile) {
      const { dataPath, errorMsg } = await uploadHandler({ file: imageFile });

      if (errorMsg) {
        toast.error(errorMsg);
        return;
      }

      await mutateAsync({
        productName: data.productName,
        price: Number(data.price),
        quantity: Number(data.quantity),
        description: data.description,
        categoryId: data.categoryId,
        imageUrl: dataPath ?? '',
      });
    } else {
      await mutateAsync({
        productName: data.productName,
        price: Number(data.price),
        quantity: Number(data.quantity),
        description: data.description,
        categoryId: data.categoryId,
        imageUrl: detailInventory?.imageUrl ?? '',
      });
    }
  };

  const handleOnFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.item(0);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };

      reader.readAsDataURL(file);
    }

    setImageFile(file);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <p className="text-xl font-semibold mb-5">New Product</p>

      <div className="flex flex-col gap-5">
        <Input
          defaultValue={detailInventory?.productName}
          name="productName"
          label="Product Name"
          placeholder="Enter Product Name"
          className="w-full"
        />

        <Input
          defaultValue={detailInventory?.price}
          name="price"
          label="Price"
          placeholder="Enter Product Price"
          type="number"
          className="w-full"
        />

        <Input
          defaultValue={detailInventory?.quantity}
          name="quantity"
          label="Quantity"
          placeholder="Enter Product Quantity"
          type="number"
          className="w-full"
        />

        <Input
          defaultValue={detailInventory?.description}
          name="description"
          label="Product Description"
          placeholder="Enter Product Description"
          variant="textarea"
          className="w-full"
        />

        <div>
          <div className="label font-medium text-[#0A0A0A]">
            <span className="label-text">Category</span>
          </div>

          <select
            defaultValue={detailInventory?.categoryId}
            className="select w-full"
            name="categoryId"
          >
            <option disabled={true}>Select Category</option>

            {listCategory.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {previewImage ? (
          <Image
            src={previewImage as string}
            alt=""
            width={300}
            height={300}
            className="mx-auto"
          />
        ) : (
          <>
            {detailInventory?.imageUrl && (
              <Image
                src={detailInventory?.imageUrl}
                alt=""
                width={300}
                height={300}
                className="mx-auto"
              />
            )}
          </>
        )}

        <div>
          <div className="label font-medium text-[#0A0A0A]">
            <span className="label-text">Product Picture</span>
          </div>

          <input
            type="file"
            className="file-input w-full"
            onChange={handleOnFileChange}
            accept="image/*"
          />
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-3">
        <Button type="submit" disabled={isPending} loading={isPending}>
          Confirm
        </Button>

        <Button
          className="bg-red-500"
          disabled={isPending}
          loading={isPending}
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UpdateInventoryContent;
