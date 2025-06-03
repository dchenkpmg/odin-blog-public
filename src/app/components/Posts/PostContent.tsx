import type { Post } from "@/app/services/apiSlice";
import { Link } from "react-router";
import styles from "./PostContent.module.css";

interface PostContentProps {
  post: Post;
}

export function PostContent({ post }: PostContentProps) {
  return (
    <div className={styles.postContent}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.subtitle}>
        <Link to={"/"} className={styles.link}>
          Back to Front Page
        </Link>
      </div>
      <div className={styles.meta}>
        <span className={styles.author}>By: {post.author.username}</span>
        <span className={styles.date}>
          Published on: {new Date(post.createdAt).toLocaleDateString()}
        </span>
        <span className={styles.updated}>
          Last updated: {new Date(post.updatedAt).toLocaleDateString()}
        </span>
      </div>
      <p className={styles.content}>{post.content}</p>
    </div>
  );
}
