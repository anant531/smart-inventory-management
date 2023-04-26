import React from 'react'

import Box from '@mui/material/Box';
import Sidebar from "../Sidebar/Sidebar";
function Account() {
  return (
    <Box sx={{ display: 'flex'}}>
    <Sidebar/>
    <Box component="main" sx={{flexGrow:1,p:3}}>
  <h1>Account</h1>
  </Box>
   
    </Box>
  )
}

export default Account