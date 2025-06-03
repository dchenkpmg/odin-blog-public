import type { Comment } from "@/app/services/apiSlice";
import styles from "./CommentsList.module.css";

interface CommentsListProps {
  comments: Comment[];
}

export function CommentsList({ comments }: CommentsListProps) {
  return (
    <div className={styles.commentsList}>
      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className={styles.comment}>
            <div className={styles.commentHeader}>
              <span className={styles.author}>
                <strong>{comment.author?.username ?? "Anonymous"}</strong>
              </span>
            </div>
            <div className={styles.content}>{comment.content}</div>
            <span className={styles.commentDate}>
              {new Date(comment.createdAt).toLocaleDateString()}
            </span>
          </div>
        ))
      ) : (
        <p className={styles.noComments}>No comments yet.</p>
      )}
    </div>
  );
}
