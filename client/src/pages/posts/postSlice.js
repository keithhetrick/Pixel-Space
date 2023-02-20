import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: "idle",
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts(state, action) {
      const { posts } = action.payload;
      state.posts = posts;
    },
  },
});

export const { setPosts } = postSlice.actions;

export default postSlice.reducer;

export const selectPosts = (state) => state.posts.posts;
