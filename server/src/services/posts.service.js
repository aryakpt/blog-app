import { categoriesRepository } from '@/respository';
import postsRepository from '@/respository/posts.repo';

const postsService = {
  async getPosts({ category, limit, page }) {
    try {
      let categoryData;
      if (category) {
        categoryData = await categoriesRepository.findByName(category);
      }
      const posts = await postsRepository.findByCategory({
        category: categoryData ? categoryData.id : undefined,
        limit,
        page,
      });

      return posts;
    } catch (error) {
      throw error;
    }
  },
};

export default postsService;
