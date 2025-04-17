import React, { useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { Button, Input } from '@/components/elements';
import uploadHandler from '@/utils/uploadHandler';
import { CreateInventory } from '@/service/API/inventory/inventory.mutation';
import { InventoryBody } from '@/types/inventory/inventory.types';
import { ResponseCategory } from '@/types/category/category.types';

interface Props {
  listCategory: ResponseCategory[];
  onClose: () => void;
  refetch: () => void;
}

const CreateInventoryContent = ({ listCategory, onClose, refetch }: Props) => {
  const [imageFile, setImageFile] = useState<File | null | undefined>(null);
  const [previewImage, setPreviewImage] = useState<string | ArrayBuffer | null>(
    ''
  );

  const { mutateAsync, isPending } = CreateInventory({
    onSuccess() {
      toast.success('Success Create Inventory');
      refetch();
      onClose();
    },
    onError() {
      toast.error('Error On Create Inventory');
    },
  });

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as InventoryBody;

    const { dataPath, errorMsg } = await uploadHandler({ file: imageFile });

    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    if (dataPath) {
      mutateAsync({
        productName: data.productName,
        price: Number(data.price),
        quantity: Number(data.quantity),
        description: data.description,
        categoryId: data.categoryId,
        imageUrl: dataPath,
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
          name="productName"
          label="Product Name"
          placeholder="Enter Product Name"
          className="w-full"
          required
        />

        <Input
          name="price"
          label="Price"
          placeholder="Enter Product Price"
          type="number"
          className="w-full"
          required
        />

        <Input
          name="quantity"
          label="Quantity"
          placeholder="Enter Product Quantity"
          type="number"
          className="w-full"
          required
        />

        <Input
          name="description"
          label="Product Description"
          placeholder="Enter Product Description"
          variant="textarea"
          className="w-full"
          required
        />

        <div>
          <div className="label font-medium text-[#0A0A0A]">
            <span className="label-text">Category</span>
          </div>

          <select
            defaultValue="Select Category"
            className="select w-full"
            name="categoryId"
            required
          >
            <option disabled={true}>Select Category</option>

            {listCategory.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {previewImage && (
          <Image
            src={previewImage as string}
            alt=""
            width={300}
            height={300}
            className="mx-auto"
          />
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
            required
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

export default CreateInventoryContent;
