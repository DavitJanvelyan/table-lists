import { Routes, Route } from "react-router-dom";

import Main from "components/Main";
import User from "components/User";
import Post from "components/Post";
import Tree from "components/Tree";
import Product from "components/Product";

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Main />}>
          <Route path="" element={<User />} />
          <Route path="posts" element={<Post />} />
          <Route path="products" element={<Product />} />
          <Route path="tree" element={<Tree />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
