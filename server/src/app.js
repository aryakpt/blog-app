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
} from '@/routes';
import { tokenMiddleware } from '@/middlewares';
import { connectDB } from '@/config/db';

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use(authRoutes, authRouter);
app.use(usersRoutes, tokenMiddleware, usersRouter);
app.use(postsRoutes, tokenMiddleware, postsRouter);
app.use(categoriesRoutes, tokenMiddleware, categoriesRouter);

export default app;
