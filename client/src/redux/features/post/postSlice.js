import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../utils/axios.js";

const initialState = {
  posts: [],
  popularsPosts: [],
  loading: false,
};

export const createPost = createAsyncThunk(
  "post/createPost",
  async (params) => {
    try {
      const { data } = await axios.post("/posts", params);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const getAllPosts = createAsyncThunk("post/getAllPosts", async () => {
  try {
    const { data } = await axios.get("/posts");
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const removePost = createAsyncThunk("posts/removePost", async (id) => {
  try {
    const { data } = await axios.delete(`/posts/${id}`, id);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatePost) => {
    try {
      const { data } = await axios.put(`/posts/${updatePost.id}`, updatePost);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    // Create Post
    [createPost.pending]: (state) => {
      state.loading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts.push(action.payload);
    },
    [createPost.rejected]: (state) => {
      state.loading = false;
    },

    // Get All Post
    [getAllPosts.pending]: (state) => {
      state.loading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = action.payload.posts;
      state.popularsPosts = action.payload.popularsPosts;
    },
    [getAllPosts.rejected]: (state) => {
      state.loading = false;
    },

    // remove Post
    [removePost.pending]: (state) => {
      state.loading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [removePost.rejected]: (state) => {
      state.loading = false;
    },

    //Update Post
    [updatePost.pending]: (state) => {
      state.loading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      state.loading = false;
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload._id
      );
    },
    [updatePost.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default postSlice.reducer;
