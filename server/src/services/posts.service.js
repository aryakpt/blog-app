import { categoriesRepository } from '@/respository';
import postsRepository from '@/respository/posts.repo';

const postsService = {
  async getPosts({ category, limit, page }) {
    try {
      let categoryData;
      if (category) {
        categoryData = await categoriesRepository.findByName(category);
      }

      const posts = await postsRepository.findAll({
        category: categoryData ? categoryData.id : undefined,
        limit,
        page,
      });

      const transformedPosts = posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.image,
        user: { name: post.user_name, image: post.user_image },
        category: { name: post.category_name, image: post.category_image },
        created_at: post.created_at,
        updated_at: post.updated_at,
      }));

      return transformedPosts;
    } catch (error) {
      throw error;
    }
  },
};

export default postsService;
