import { upload } from '@/config/storage';
import { fileController } from '@/controllers';
import { tokenMiddleware } from '@/middlewares';
import { Router } from 'express';

export const fileRoutes = '/api/file';

const fileRouter = Router();

fileRouter.post(
  '/upload',
  tokenMiddleware,
  upload.single('image'),
  fileController.upload
);

export default fileRouter;
