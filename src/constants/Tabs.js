import User from "components/User";
import Post from "components/Post";
import Tree from "components/Tree";
import Product from "components/Product";

export const TAB_LIST = ['users', 'posts', 'products', 'tree'];

export const TAB_PANEL = [
  {
    value: 'users',
    component: <User />
  },
  {
    value: 'posts',
    component: <Post />
  },
  {
    value: 'products',
    component: <Product />
  },
  {
    value: 'tree',
    component: <Tree />
  }
];