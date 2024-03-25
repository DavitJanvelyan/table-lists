import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";

import Search from "components/Search";
import CreateOrEditPost from "modals/Post/CreateOrEdit";
import PaginationPage from "components/Pagination";

import { POST_TABLE_HEAD } from "constants/Table";
import { allPostsSelector, countSelector, deletePost, fetchLimitedPosts, fetchPosts } from "store/postSlice";

import "components/Post/index.scss"

function Post() {

  const limit = 5;
  const dispatch = useDispatch();
  const posts = useSelector(allPostsSelector);
  const count = useSelector(countSelector);
  const setTimeoutRef = useRef(null)

  const [initialLength, setInitialLength] = useState(0);
  const [paginationCount, setPaginationCount] = useState(0);
  const [paginationPage, setPaginationPage] = useState(1);
  const [start, setStart] = useState(0);
  const [isPostEditModalOpen, setIsPostEditModalOpen] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState({});
  const [postSearchText, setPostSearchText] = useState('');
  const [filteredPostsValue, setFilteredPostsValue] = useState('');

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (count) {
      setInitialLength(count);
      setPaginationCount(Math.ceil(count / limit))
    }
  }, [count]);

  useEffect(() => {
    dispatch(fetchLimitedPosts({ start, limit }))
  }, [start, paginationPage]);

  function onChangePaginationPage(page) {
    setPaginationPage(page);
    setStart((page - 1) * limit)
  }

  function togglePostEditModal(isOpen, updateModal = {}) {
    setIsPostEditModalOpen(isOpen);
    setIsUpdateModal(updateModal);
  }

  function changeInputValue(val) {
    setPostSearchText(val)

    if (setTimeoutRef.current) {
      clearTimeout(setTimeoutRef.current);
    }

    setTimeoutRef.current = setTimeout(() => {
      setFilteredPostsValue(val)
    }, 2000)
  }

  return (
    <div className="post">
      <div className="post-search">
        <div className="input">
          <Search placeholder="posts" text={postSearchText} onChangeInput={changeInputValue} />
        </div>
      </div>
      <div className="create-button">
        <Button variant="contained" onClick={() => togglePostEditModal(true)}>Create</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              {POST_TABLE_HEAD.map((item) => (
                <TableCell className="align-right" key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {posts?.filter(post => post.title.toUpperCase().includes(filteredPostsValue.toUpperCase().trim())).map(({id, ...postData}) => (
              <TableRow
                key={id}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
              >
                {Object.keys(postData).map((key) => (
                  <TableCell key={key} className="align-right">
                    {postData[key]}
                  </TableCell>
                ))}
                <TableCell className="align-right">
                  <EditIcon className="icons" onClick={() => togglePostEditModal(true, { isUpdate: true, id })} />
                  <DeleteIcon className="icons delete-icon" onClick={() => dispatch(deletePost(id))} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="pagination">
        {initialLength > limit ? <PaginationPage page={paginationPage} count={paginationCount} changePaginationPage={onChangePaginationPage}/> : null}
      </div>
      { isPostEditModalOpen ? <CreateOrEditPost isPostEditModalOpen={isPostEditModalOpen} isUpdateModal={isUpdateModal} onClose={togglePostEditModal} /> : null }
    </div>
  );
}

export default Post;