import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/query';
import {postsService} from 'api/rest';

export const store = configureStore({
  reducer: {
    [postsService.reducerPath]: postsService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(postsService.middleware),
});

setupListeners(store.dispatch);
