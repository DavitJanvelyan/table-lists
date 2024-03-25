import React, { useRef } from "react";

import TextField from "@mui/material/TextField";

import "components/Search/index.scss"

function Search({ placeholder = '', text = '', onChangeInput }) {

  return (
    <div className="search">
      <TextField variant="outlined" className="search-input" placeholder={`Search ${placeholder}...`} value={text} onChange={(e) => onChangeInput(e.target.value)} />
    </div>
  )
}

export default Search;