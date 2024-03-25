import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import CreateOrEditUser from "modals/User/CreateOrEdit";
import Search from "components/Search";

import { USER_TABLE_HEAD } from "constants/Table";
import { allUsersSelector, deleteUser, fetchUsers } from "store/userSlice";

import "components/User/index.scss"

function User() {

  const dispatch = useDispatch();
  const users = useSelector(allUsersSelector);
  const setTimeoutRef = useRef(null)

  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState({});
  const [userSearchText, setUserSearchText] = useState('');
  const [filteredUsersValue, setFilteredUsersValue] = useState('');

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  function toggleUserEditModal(isOpen, updateModal = {}) {
    setIsUserEditModalOpen(isOpen);
    setIsUpdateModal(updateModal);
  }

  function changeInputValue(val) {
    setUserSearchText(val)

    if (setTimeoutRef.current) {
      clearTimeout(setTimeoutRef.current);
    }

    setTimeoutRef.current = setTimeout(() => {
      setFilteredUsersValue(val)
    }, 2000)
  }

  return (
    <div className="user">
      <div className="user-search">
        <div className="input">
          <Search placeholder="users" text={userSearchText} onChangeInput={changeInputValue} />
        </div>
      </div>
      <div className="create-button">
        <Button variant="contained" onClick={() => toggleUserEditModal(true)}>Create</Button>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{minWidth: 650}} aria-label="simple table">
          <TableHead>
            <TableRow>
              {USER_TABLE_HEAD.map((item) => (
                <TableCell className="align-right" key={item}>{item}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {users?.filter(user => user.name.toUpperCase().includes(filteredUsersValue.toUpperCase().trim())).map(({ id, ...userData }) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(userData).map((key) => (
                  <TableCell key={key} className="align-right">
                    {typeof userData[key] === 'object' ?
                      (key === 'address' ? `${userData[key].city} ${userData[key].street}` : userData[key].name)
                      : userData[key]}
                  </TableCell>
                ))}
                <TableCell className="align-right">
                  <EditIcon className="icons" onClick={() => toggleUserEditModal(true, { isUpdate: true, id })} />
                  <DeleteIcon className="icons delete-icon" onClick={() => dispatch(deleteUser(id))} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isUserEditModalOpen ? <CreateOrEditUser isUserEditModalOpen={isUserEditModalOpen} isUpdateModal={isUpdateModal} onClose={toggleUserEditModal}/> : null}
    </div>
  );
}

export default User;