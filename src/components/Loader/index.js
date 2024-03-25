import React from "react";

import { CircularProgress } from "@mui/material";
import Box from "@mui/material/Box";

import "components/Loader/index.scss"

function Loader() {
  return (
    <div>
      <Box className="loader">
        <CircularProgress />
      </Box>
    </div>
  )
}

export default Loader