import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Author = {
  username: string;
};

export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  published: boolean;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export type NewComment = Omit<
  Comment,
  "id" | "createdAt" | "updatedAt" | "author"
> & {
  postId: number;
  userId?: number;
};

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
  }),
  tagTypes: ["Post", "Comment"],
  endpoints: (builder) => ({
    getPublicPosts: builder.query<Post[], void>({
      query: () => "/posts/public",
      providesTags: ["Post"],
    }),
    getPost: builder.query<Post, number>({
      query: (id) => `/posts/${id}`,
      providesTags: ["Post"],
    }),
    getComments: builder.query<Comment[], number>({
      query: (id) => `/posts/${id}/comments`,
      providesTags: ["Comment"],
    }),
    postComment: builder.mutation<
      Comment,
      { postId: number; newComment: NewComment }
    >({
      query: ({ postId, newComment }) => ({
        url: `/posts/${postId}/comments`,
        method: "POST",
        body: newComment,
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetPublicPostsQuery,
  useGetPostQuery,
  useGetCommentsQuery,
  usePostCommentMutation,
} = api;
