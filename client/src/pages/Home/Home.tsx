import {GetPostsQueryParams, PostListItem, postsService} from 'api/rest';
import {useEffect, useState} from 'react';

function Home() {
  const [queryParams, setQueryParams] = useState<GetPostsQueryParams>({category: '', limit: 10, page: 1});
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const {data} = postsService.useGetPostsQuery({params: queryParams});

  useEffect(() => {
    if (data?.result) {
      setPosts((prev) => [...prev, ...data.result]);
    }
  }, [data]);

  return (
    <div>
      {posts.map((post) => (
        <div> {post.content}</div>
      ))}
      <button onClick={() => setQueryParams((prev) => ({...prev, page: (prev.page ?? 0) + 1}))}>Next Page</button>
    </div>
  );
}

export default Home;
