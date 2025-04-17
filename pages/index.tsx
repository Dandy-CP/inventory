import React, { useState } from 'react';
import { IconPlus } from '@tabler/icons-react';
import { Button, Card, Modal, Input, Pagination } from '@/components/elements';
import {
  CreateInventoryContent,
  OverallInventory,
  ProductCard,
  UpdateInventoryContent,
} from '@/components/modules/inventory';
import { useDebounce } from '@/hooks';
import { GetInventory } from '@/service/API/inventory/inventory.query';
import { GetListCategory } from '@/service/API/category/category.query';

const Dashboard = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isUpdateProductOpen, setIsUpdateProductOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedID, setSelectedID] = useState('');
  const [page, setPage] = useState(1);

  const valueQuery = useDebounce(searchQuery, 1000);

  const {
    data: inventory,
    isFetching,
    refetch,
  } = GetInventory(
    { search: valueQuery, page: page, category: selectedCategory },
    { queryKey: [valueQuery, page, selectedCategory] }
  );

  const { data: category } = GetListCategory();

  const listCategory = category ?? [];
  const listInventory = inventory?.data ?? [];
  const totalProduct = inventory?.pagination?.totalCount ?? 0;
  const totalPage = inventory?.pagination?.pageCount ?? 0;
  const isHasNextPage = inventory?.pagination?.isLastPage ?? true;

  return (
    <div>
      <OverallInventory totalProduct={totalProduct} />

      <Card className="p-5 phone:mb-20">
        <div className="flex flex-row justify-between items-center mb-5 phone:flex-col phone:items-start phone:gap-5">
          <p className="text-xl font-semibold text-gray-500">Products</p>

          <div className="flex flex-row gap-3">
            <Button
              IconComponents={() => <IconPlus />}
              onClick={() => {
                setIsAddProductOpen(true);
              }}
            >
              Add Product
            </Button>

            <select
              defaultValue="Select Category"
              className="select"
              onChange={(event) => {
                setSelectedCategory(event.target.value);
              }}
            >
              <option disabled={true}>Select Category</option>
              <option value="">All</option>

              {listCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Input
          placeholder="Search"
          className="my-3 phone:w-full"
          onChange={(event) => {
            setSearchQuery(event.target.value);
          }}
        />

        {isFetching && (
          <div className="flex flex-row justify-center items-center">
            <p className="text-gray-400 text-sm my-10">Loading...</p>
          </div>
        )}

        {!isFetching && listInventory.length === 0 && (
          <div className="flex flex-row justify-center items-center">
            <p className="text-gray-400 text-xl my-20">Currently No Data</p>
          </div>
        )}

        <div className="flex flex-col gap-5">
          {!isFetching &&
            listInventory.map((value) => (
              <ProductCard
                setIsUpdateProductOpen={setIsUpdateProductOpen}
                setSelectedID={setSelectedID}
                key={value.id}
                inventory={value}
                refetch={() => {
                  refetch();
                }}
              />
            ))}
        </div>

        <div className="flex justify-center mt-10">
          <Pagination
            page={page}
            totalPage={totalPage}
            disabledNext={isFetching || isHasNextPage}
            disabledPrev={isFetching || page === 1}
            setPage={setPage}
          />
        </div>
      </Card>

      <Modal
        isOpen={isAddProductOpen}
        onClose={() => setIsAddProductOpen(false)}
      >
        <CreateInventoryContent
          listCategory={listCategory}
          onClose={() => setIsAddProductOpen(false)}
          refetch={() => {
            refetch();
          }}
        />
      </Modal>

      <Modal
        isOpen={isUpdateProductOpen}
        onClose={() => setIsUpdateProductOpen(false)}
      >
        <UpdateInventoryContent
          selectedID={selectedID}
          listCategory={listCategory}
          onClose={() => setIsUpdateProductOpen(false)}
          refetch={() => {
            refetch();
          }}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
