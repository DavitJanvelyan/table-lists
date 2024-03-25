import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

import {
  addNewPost,
  getSinglePost,
  resetSinglePostData,
  singlePostSelector,
  updateCurrentPost
} from "store/postSlice";

import "./index.scss"

function CreateOrEditPost({ isPostEditModalOpen, isUpdateModal: { isUpdate, id } = {}, onClose }) {

  const defaultPosts = {
    title: '',
    body: '',
  }

  const singlePost = useSelector(singlePostSelector);
  const dispatch = useDispatch();

  const [addOrEditPost, setAddOrEditPost] = useState({})

  useEffect(() => {
    if (isUpdate) {
      dispatch(getSinglePost(id));
    }
    setAddOrEditPost(defaultPosts);
  }, [id, dispatch]);

  useEffect(() => {
    if (singlePost && isUpdate) {
      const post = {...singlePost};
      delete post.id;
      setAddOrEditPost(post)
    }
  }, [singlePost, id]);

  function onChangePost({ target: { name, value } }) {
    setAddOrEditPost({...addOrEditPost, [name]: value})
  }

  function createOrUpdatePost() {
    const isValid = Object.values(addOrEditPost).every(val => val.toString().trim());
    if (!isValid) return;

    if (isUpdate) {
      dispatch(updateCurrentPost({ id, post: addOrEditPost }))
    } else {
      dispatch(addNewPost({userId: 1, ...addOrEditPost}));
    }
    closeModal();
  }

  function closeModal() {
    onClose(false);
    if (singlePost) {
      dispatch(resetSinglePostData(null))
    }
  }

  return (
    <>
      <Modal
        open={isPostEditModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="create-edit-post">
          <Typography id="modal-modal-description" sx={{ textAlign: 'center' }}>
            {isUpdate ? 'Edit post' : 'Add post'}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            {Object.keys(defaultPosts).map((key) => (
              <TextField multiline rows={5} key={key} className="inputs" placeholder={key.toUpperCase()} label={key.toUpperCase()} name={key} value={addOrEditPost[key] || ''} onChange={onChangePost} />
            ))}
            {/*<TextField multiline rows={5} className="inputs" placeholder="Body" label="Body" name="body" value={addOrEditPost.body || ''} onChange={onChangePost} />*/}
          </Typography>
          <div className="add-update-button">
            <Button variant="contained" onClick={createOrUpdatePost}>{isUpdate ? 'Update' : 'Add'}</Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default CreateOrEditPost;