import { configureStore } from "@reduxjs/toolkit";

import userReducer from "store/userSlice"
import postReducer from "store/postSlice"
import productReducer from "store/productSlice"

export default configureStore({
  reducer: {
    users: userReducer,
    posts: postReducer,
    products: productReducer
  }
})