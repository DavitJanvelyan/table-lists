import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

function PaginationPage({page, count, changePaginationPage}) {

  function handleChange(event, value){
    if (page !== value) {
      changePaginationPage(value)
    }
  }

  return (
    <Pagination
      size="large"
      color="primary"
      variant="outlined"
      shape="rounded"
      count={count}
      page={page}
      onChange={handleChange}
    />
  );
}

export default PaginationPage;