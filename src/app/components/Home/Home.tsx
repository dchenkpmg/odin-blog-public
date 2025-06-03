import styles from "./Home.module.css";
import { useGetPublicPostsQuery } from "@/app/services/apiSlice";
import type { Post } from "@/app/services/apiSlice";
import { useMemo } from "react";
import { Link } from "react-router";
import TimeAgo from "@/app/components/Posts/TimeAgo";
import PostAuthor from "@/app/components/Posts/PostAuthor";

interface PostExcerptProps {
  post: Post;
}

function PostExcerpt({ post }: PostExcerptProps) {
  return (
    <article className={styles.postExcerpt}>
      <h3 className={styles.postTitle}>
        <Link to={`/posts/${post.id}`} className={styles.postLink}>
          {post.title}
        </Link>
      </h3>
      <div className={styles.postMeta}>
        <PostAuthor username={post.author.username} />
        <TimeAgo timestamp={post.createdAt} />
      </div>
      <p className={styles.postContent}>
        {post.content.length > 100
          ? post.content.substring(0, 100) + "..."
          : post.content}
      </p>
    </article>
  );
}

function Home() {
  const {
    data: posts = [],
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPublicPostsQuery();

  const sortedPosts = useMemo(() => {
    const sortedPosts = posts.slice();
    sortedPosts.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return sortedPosts;
  }, [posts]);

  let content: React.ReactNode;

  if (isLoading) {
    content = <div className={styles.loading}>Loading...</div>;
  } else if (isSuccess) {
    content = sortedPosts.map((post) => (
      <PostExcerpt key={post.id} post={post} />
    ));
  } else if (isError) {
    content = <div className={styles.error}>Error: {error.toString()}</div>;
  }

  return <div className={styles.homeWrapper}>{content}</div>;
}

export default Home;
