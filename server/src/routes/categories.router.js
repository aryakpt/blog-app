import { categoriesController } from '@/controllers';
import { adminMiddleware, tokenMiddleware } from '@/middlewares';
import { Router } from 'express';

export const categoriesRoutes = '/api/categories';

const categoriesRouter = Router();

categoriesRouter.get('/', categoriesController.getCategories);
categoriesRouter.get('/:id', categoriesController.getCategory);
categoriesRouter.post(
  '/',
  tokenMiddleware,
  adminMiddleware,
  categoriesController.createCategory
);
categoriesRouter.put(
  '/:id',
  tokenMiddleware,
  adminMiddleware,
  categoriesController.updateCategory
);
categoriesRouter.delete(
  '/:id',
  tokenMiddleware,
  adminMiddleware,
  categoriesController.deleteCategory
);

export default categoriesRouter;
