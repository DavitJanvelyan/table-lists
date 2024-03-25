import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";

import {
  addNewUser,
  getSingleUser,
  resetSingleUserData,
  singleUserSelector,
  updateCurrentUser
} from "store/userSlice";

import "./index.scss"

function CreateOrEditUser({ isUserEditModalOpen, isUpdateModal: { isUpdate, id } = {}, onClose }) {

  const singleUser = useSelector(singleUserSelector);
  const dispatch = useDispatch();

  const defaultUsers = {
    name: '',
    username: '',
    email: '',
    address: {
      street: '',
      city: ''
    },
    phone: '',
    website: '',
    company: {
      name: ''
    }
  }

  const [addOrEditUser, setAddOrEditUser] = useState({});

  useEffect(() => {
    if (isUpdate) {
      dispatch(getSingleUser(id));
    }
    setAddOrEditUser(defaultUsers);
  }, [id, dispatch]);

  useEffect(() => {
    if (singleUser && isUpdate) {
      const user = {...singleUser};
      delete user.id;
      setAddOrEditUser(user);
    }
  }, [singleUser, id]);

  function onChangeUser({ target: { name, value } }) {
    if (name === 'city' || name === 'street') {
      setAddOrEditUser({...addOrEditUser, address: {...addOrEditUser.address, [name]: value}})
    } else if (name === 'companyName') {
      setAddOrEditUser({...addOrEditUser, company: {...addOrEditUser.company, name: value}})
    } else {
      setAddOrEditUser({...addOrEditUser, [name]: value})
    }
  }

  function createOrUpdateUser() {
    const isValid = Object.values(addOrEditUser).every(val => val.toString().trim());
    if (!isValid) return;

    if (isUpdate) {
      dispatch(updateCurrentUser({ id, user: addOrEditUser }));
    } else {
      dispatch(addNewUser(addOrEditUser));
    }
    closeModal();
  }

  function closeModal() {
    onClose(false)
    if (singleUser) {
      dispatch(resetSingleUserData(null))
    }
  }

  return (
    <>
      <Modal
        open={isUserEditModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="create-edit-user">
          <Typography id="modal-modal-description" sx={{ textAlign: 'center' }}>
            {isUpdate ? 'Edit user' : 'Add user'}
          </Typography>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
            {Object.keys(defaultUsers).map((key) => (
              <>
                {typeof addOrEditUser[key] === 'object' ?
                  (key === 'address' ?
                      (
                        <>
                          <TextField variant="outlined" className="inputs" key={key} placeholder="CITY" label="CITY" name="city" value={addOrEditUser?.address?.city || ''} onChange={onChangeUser} />
                          <TextField variant="outlined" className="inputs" key={key} placeholder="STREET" label="STREET" name="street" value={addOrEditUser?.address?.street || ''} onChange={onChangeUser} />
                        </>
                      )
                  : <TextField variant="outlined" className="inputs" key={key} placeholder="COMPANY NAME" label="COMPANY NAME" name="companyName" value={addOrEditUser?.company?.name || ''} onChange={onChangeUser} />
                  )
                  : <TextField variant="outlined" className="inputs" key={key} placeholder={key.toUpperCase()} label={key.toUpperCase()} name={key} value={addOrEditUser[key] || ''} onChange={onChangeUser} />
                }
              </>
            ))}
            {/*<TextField variant="outlined" className="inputs" placeholder="Company name" label="Company name" name="companyName" value={addOrEditUser?.company?.name || ''} onChange={onChangeUser} />*/}
          </Typography>
          <div className="add-update-button">
            <Button variant="contained" onClick={createOrUpdateUser}>{isUpdate ? 'Update' : 'Add'}</Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default CreateOrEditUser;