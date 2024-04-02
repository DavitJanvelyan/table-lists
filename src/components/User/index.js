import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { allUsersSelector, deleteUser, fetchUsers } from "store/userSlice";

import { useSearchParams } from "react-router-dom";

import { USER_TABLE_HEAD } from "constants/Table";

import Loader from "../Loader";

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

import "components/User/index.scss"

function User() {

  const dispatch = useDispatch();
  const users = useSelector(allUsersSelector);
  const setTimeoutRef = useRef(null)

  const [isLoader, setIsLoader] = useState(true);
  const [filterParams, setFilterParams] = useSearchParams();
  const [isUserEditModalOpen, setIsUserEditModalOpen] = useState(false);
  const [isUpdateModal, setIsUpdateModal] = useState({});
  const [userSearchText, setUserSearchText] = useState(filterParams.get('searchText') || '');
  const [filteredUsers, setFilteredUsers] = useState([])

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);

  useEffect(() => {
    if (filteredUsers.length) {
      setIsLoader(false);
    }
  }, [filteredUsers.length]);

  useEffect(() => {
    if (setTimeoutRef.current) {
      clearTimeout(setTimeoutRef.current);
    }

    setTimeoutRef.current = setTimeout(() => {
      applyFilters();
    }, 400)
  }, [userSearchText, users.length])

  function toggleUserEditModal(isOpen, updateModal = {}) {
    setIsUserEditModalOpen(isOpen);
    setIsUpdateModal(updateModal);
  }

  function applyFilters() {
    let filtered = users;
    if (userSearchText.trim() !== '') {
      filtered = filtered.filter(user => user.name.toLowerCase().includes(userSearchText.toLowerCase().trim()));

      setFilterParams(filterParams => {
        filterParams.set('searchText', userSearchText)
        return filterParams;
      })

    } else {
      setFilterParams(filterParams => {
        filterParams.delete('searchText')
        return filterParams;
      })
    }

    setFilteredUsers(filtered);
  }

  return (
    <div className="user">
      {isLoader ?
        <Loader /> :
        <>
          <div className="user-search">
            <div className="input">
              <Search placeholder="users" text={userSearchText} onChangeInput={(val) => setUserSearchText(val)} />
            </div>
          </div>
          <div className="create-button">
            <Button variant="contained" onClick={() => toggleUserEditModal(true)}>Create</Button>
          </div>
          <TableContainer component={Paper} className="table">
            <Table sx={{minWidth: 650}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {USER_TABLE_HEAD.map((item) => (
                    <TableCell className="align-right table-cell" key={item}>{item}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers?.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={USER_TABLE_HEAD.length} align="center" className="table-cell">No Users</TableCell>
                    </TableRow>
                  ) :
                  filteredUsers?.map(({ id, ...userData }) => (
                    <TableRow
                      key={id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      {Object.keys(userData).map((key) => (
                        <TableCell key={key} className="align-right table-cell">
                          {typeof userData[key] === 'object' ?
                            (key === 'address' ? `${userData[key].city} ${userData[key].street}` : userData[key].name)
                            : userData[key]}
                        </TableCell>
                      ))}
                      <TableCell className="align-right table-cell">
                        <EditIcon className="icons" onClick={() => toggleUserEditModal(true, { isUpdate: true, id })} />
                        <DeleteIcon className="icons delete-icon" onClick={() => dispatch(deleteUser(id))} />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {isUserEditModalOpen ? <CreateOrEditUser isUserEditModalOpen={isUserEditModalOpen} isUpdateModal={isUpdateModal} onClose={toggleUserEditModal}/> : null}
        </>
      }
    </div>
  );
}

export default User;