import React from 'react'

import Box from '@mui/material/Box';
import Sidebar from "../Sidebar/Sidebar";
export default function Employee() {
  return (<Box sx={{ display: 'flex'}}>
  <Sidebar/>
  <Box component="main" sx={{flexGrow:1,p:3}}>
<h1>All Employees</h1>
</Box>
 
  </Box>
  )
}
