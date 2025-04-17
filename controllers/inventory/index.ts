import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/config/prisma';

export const getListInventory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { query } = req;

  if (query.search) {
    await prisma.productInventory
      .findMany({
        where: {
          productName: {
            contains: query.search as string,
            mode: 'insensitive',
          },
        },
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  if (query.id) {
    await prisma.productInventory
      .findUnique({
        where: {
          id: query.id as string,
        },
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  if (query.category) {
    await prisma.productInventory
      .findMany({
        where: {
          categoryId: {
            equals: query.category as string,
          },
        },
      })
      .then((data) => {
        return res.status(200).json({ data: data });
      });
  }

  const [data, meta] = await prisma.productInventory.paginate().withPages({
    page: Number(query.page) || 1,
    limit: Number(query.limit) || 10,
  });

  return res.status(200).json({ data: data, pagination: meta });
};

export const createInventory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body } = req;

  await prisma.productInventory
    .create({
      data: {
        productName: body.productName,
        price: body.price,
        quantity: body.quantity,
        description: body.description,
        imageUrl: body.imageUrl,
        category: {
          connect: {
            id: body.categoryId,
          },
        },
      },
    })
    .then((data) => {
      return res.status(200).json({
        message: 'Success Create Inventory',
        ...data,
      });
    });
};

export const updateInventory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body, query } = req;

  const productInventoryInDB = await prisma.productInventory.findUnique({
    where: { id: query.id as string },
  });

  if (!productInventoryInDB) {
    return res.status(404).json({
      message: 'Product Inventory not found',
    });
  }

  if (productInventoryInDB) {
    await prisma.productInventory
      .update({
        where: {
          id: query.id as string,
        },
        data: {
          productName: body.productName,
          price: body.price,
          quantity: body.quantity,
          description: body.description,
          imageUrl: body.imageUrl,
          category: {
            connect: {
              id: body.categoryId,
            },
          },
        },
      })
      .then((data) => {
        return res.status(200).json({
          message: 'Success Update Inventory',
          ...data,
        });
      });
  }
};

export const deleteInventory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { query } = req;

  const productInventoryInDB = await prisma.productInventory.findUnique({
    where: { id: query.id as string },
  });

  if (!productInventoryInDB) {
    return res.status(404).json({
      message: 'Product Inventory not found',
    });
  }

  if (productInventoryInDB) {
    await prisma.productInventory
      .delete({ where: { id: query.id as string } })
      .then(() => {
        return res.status(200).json({
          message: 'Success Delete product Inventory',
        });
      });
  }
};
