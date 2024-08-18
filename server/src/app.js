import express from 'express';
import cors from 'cors';
import {connectDB} from './config/db.js';

import {authRouter, authRoutes, postsRouter, postsRoutes, usersRouter, usersRoutes} from './routes/index.js';
import {tokenMiddleware} from './middlewares/index.js';

const app = express();
const port = 8800;

app.use(cors());
app.use(express.json());

connectDB();

app.use(authRoutes, authRouter);
app.use(usersRoutes, usersRouter);
app.use(postsRoutes, tokenMiddleware, postsRouter);

app.listen(port, () => {
  console.log(`listening on port http://localhost:${port}`);
});
