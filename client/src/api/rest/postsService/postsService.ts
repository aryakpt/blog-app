import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {GetPostsQueryParams, PostListResponse, postListResponseSchema} from './schemas';

const postsService = createApi({
  reducerPath: 'postsService',
  baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_API_BASE_URL}),
  endpoints: (builder) => ({
    getPosts: builder.query<PostListResponse, {params: GetPostsQueryParams}>({
      query: ({params}) => {
        return {
          url: '/posts',
          params: params,
        };
      },
      transformResponse: (response: PostListResponse) => {
        postListResponseSchema.parse(response);
        return response;
      },
    }),
  }),
});

export default postsService;
