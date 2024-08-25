import {z} from 'zod';

export const postListItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  image: z.string().nullable(),
  user: z.object({
    name: z.string(),
    image: z.string().nullable(),
  }),
  category: z.object({
    name: z.string(),
    image: z.string().nullable(),
  }),
  created_at: z.string().nullable(),
  updated_at: z.string().nullable(),
});

export type PostListItem = z.infer<typeof postListItemSchema>;

export const postListResponseSchema = z.object({
  status: z.number(),
  message: z.string(),
  result: z.array(postListItemSchema),
});

export type PostListResponse = z.infer<typeof postListResponseSchema>;

export const getPostsQueryParamsSchema = z.object({
  category: z.string().optional(),
  limit: z.number().optional(),
  page: z.number().optional(),
});

export type GetPostsQueryParams = z.infer<typeof getPostsQueryParamsSchema>;
