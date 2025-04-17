import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/config/prisma';

export const getListCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await prisma.productCategory
    .findMany({ include: { productInventory: true } })
    .then((data) => {
      res.status(200).json(data);
    });
};

export const createCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body } = req;

  await prisma.productCategory
    .create({
      data: {
        name: body.name,
      },
    })
    .then((data) => {
      return res.status(200).json({
        message: 'Success Create Category',
        ...data,
      });
    });
};

export const updateCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { body, query } = req;

  const categoryInDB = await prisma.productCategory.findUnique({
    where: { id: query.id as string },
  });

  if (!categoryInDB) {
    return res.status(404).json({
      message: 'Category not found',
    });
  }

  if (categoryInDB) {
    await prisma.productCategory
      .update({
        where: {
          id: query.id as string,
        },
        data: {
          name: body.name,
        },
      })
      .then(() => {
        return res.status(200).json({
          message: 'Success Update Category',
        });
      });
  }
};

export const deleteCategory = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { query } = req;

  const categoryInDB = await prisma.productCategory.findUnique({
    where: { id: query.id as string },
  });

  if (categoryInDB) {
    await prisma.productInventory
      .deleteMany({ where: { categoryId: query.id as string } })
      .then(async () => {
        await prisma.productCategory
          .delete({
            where: {
              id: query.id as string,
            },
          })
          .then(() => {
            return res.status(200).json({
              message: 'Success Delete Category',
            });
          });
      });
  } else {
    return res.status(404).json({ message: 'Category Not Found' });
  }
};
