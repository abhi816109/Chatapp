import React, { useEffect, useState } from 'react'
import  "./Sidebar.css"
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import {Avatar, IconButton } from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';

function Sidebar() {

  const [rooms,setRooms]= useState([]);
  const [{user}, dispatch] =useStateValue();

  useEffect(() => {
    
  })

    return (
        <div className='sidebar'>
        
            <div className="sidebar__header">
            <Avatar src={user?.photoURL}/>
             <div className="sidebar__headerRight">
                 <IconButton>
               <DonutLargeIcon/>
               </IconButton>
                 <IconButton>
               <ChatIcon/>
               </IconButton>
                 <IconButton>
               <MoreVertIcon/>
               </IconButton>
             </div>
            </div>
          
          <div className="sidebar__search">
   <div className="sidebar__searchContainer">
         <SearchIcon/>
         <input placeholder="Search or start a new chat" type="text" />
   </div>

          </div>
          
          <div className="sidebar__chats">
              <SidebarChat addNewChat/>
              <SidebarChat/>
              <SidebarChat/>
          </div>

        </div>
    )
}

export default Sidebar
