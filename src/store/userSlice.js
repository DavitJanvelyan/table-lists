import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async function () {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

export const addNewUser = createAsyncThunk(
  'users/addNewUser',
  async function (user, { dispatch}) {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(user)
      })
      const data = await response.json();
      dispatch(addUser({...user, ...data}))
    } catch (error) {
      console.log(error);
    }
  }
)

export const getSingleUser = createAsyncThunk(
  'users/singleUser',
  async function (id) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      return await response.json();
    } catch (error) {
      console.log(error);
    }
  }
)

export const updateCurrentUser = createAsyncThunk(
  'users/updateUser',
  async function ({id, user}, { dispatch}) {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user)
      })
      const data = await response.json();
      dispatch(updateUser({...user, ...data}))
    } catch (error) {
      console.log(error);
    }
  }
)

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async function (id, { dispatch}) {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE',
      })
      dispatch(removeUser({id}))
    } catch (error) {
      console.log(error);
    }
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    singleUser: null,
  },
  reducers: {
    addUser(state, { payload }) {
      state.users = [payload, ...state.users];
    },
    updateUser(state, { payload }) {
      const { id } = payload
      const updatedUserIndex = state.users.findIndex(user => user.id === id)
      state.users[updatedUserIndex] = payload;
    },
    removeUser(state, { payload: { id } }) {
      state.users = state.users.filter(user => user.id !== id);
    },
    resetSingleUserData(state, { payload }) {
      state.singleUser = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, { payload }) => {
        state.users = payload;
      })
      .addCase(getSingleUser.fulfilled, (state, { payload }) => {
        state.singleUser = payload;
      })
  }
})

export const { addUser, updateUser, removeUser, resetSingleUserData} = userSlice.actions

export const allUsersSelector = state => state.users.users

export const singleUserSelector = state => state.users.singleUser

export default userSlice.reducer