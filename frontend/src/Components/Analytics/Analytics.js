import React from 'react'

import Box from '@mui/material/Box';
import Sidebar from "../Sidebar/Sidebar";
function Analytics() {
  return (
    <Box sx={{ display: 'flex'}}>
    <Sidebar/>
    <Box component="main" sx={{flexGrow:1,p:3}}>
  <h1>Analytics</h1>
  </Box>
   
    </Box>
  )
}

export default Analytics