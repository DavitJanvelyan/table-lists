import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async function () {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

export const fetchLimitedPosts = createAsyncThunk(
  'posts/fetchLimitedPosts',
  async function ({ start, limit }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=${limit}`)
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

export const addNewPost = createAsyncThunk(
  'posts/addNewPost',
  async function (post, { dispatch }) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(post)
      })
      const data = await response.json();
      dispatch(addPost({...post, ...data}))
    } catch (error) {
      console.log(error);
    }
  }
)

export const getSinglePost = createAsyncThunk(
  'posts/getSinglePost',
  async function (id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

export const updateCurrentPost = createAsyncThunk(
  'posts/updateCurrentPost',
  async function ({ id, post }, { dispatch }) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify(post)
      })
      const data = await response.json();
      dispatch(updatePost({...post, ...data}))
    } catch (error) {
      console.log(error);
    }
  }
)

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async function (id, { dispatch}) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      })
      dispatch(removePost({id}))
    } catch (error) {
      console.log(error);
    }
  }
)

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    count: null,
    singlePost: null,
  },
  reducers: {
    addPost(state, { payload }) {
      state.posts = [payload, ...state.posts]
    },
    updatePost(state, { payload }) {
      const { id } = payload
      const updatedPostIndex = state.posts.findIndex(post => post.id === id)
      state.posts[updatedPostIndex] = payload;
    },
    removePost(state, { payload: { id } }) {
      state.posts = state.posts.filter(post => post.id !== id)
    },
    resetSinglePostData(state, { payload }) {
      state.singlePost = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, { payload }) => {
        state.count = payload.length;
      })
      .addCase(fetchLimitedPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(getSinglePost.fulfilled, (state, { payload }) => {
        state.singlePost =  payload;
      })
  }
})

export const { addPost, updatePost, removePost, resetSinglePostData } = postSlice.actions

export const allPostsSelector = state => state.posts.posts;

export const countSelector = state => state.posts.count;

export const singlePostSelector = state => state.posts.singlePost;

export default postSlice.reducer