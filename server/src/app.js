import express from 'express';
import cors from 'cors';

import {
  authRouter,
  authRoutes,
  categoriesRouter,
  categoriesRoutes,
  postsRouter,
  postsRoutes,
  usersRouter,
  usersRoutes,
  fileRouter,
  fileRoutes,
} from '@/routes';
import { connectDB } from '@/config/db';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(fileRoutes, fileRouter);
app.use(authRoutes, authRouter);
app.use(usersRoutes, usersRouter);
app.use(postsRoutes, postsRouter);
app.use(categoriesRoutes, categoriesRouter);

export default app;
