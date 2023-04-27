//import useState hook to create menu collapse state
import React, { useState } from "react";

//import react pro sidebar components
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

//import icons from react icons
import { BsPeople } from "react-icons/bs";
import {
  FiHome,
  FiLogOut,
  FiArrowLeftCircle,
  FiArrowRightCircle,
} from "react-icons/fi";
import { BiCog, BiArrowToBottom, BiArrowToTop } from "react-icons/bi";
import { AiOutlineAppstoreAdd, AiOutlineStock } from "react-icons/ai";
import { MdOutlineAccountCircle } from "react-icons/md";
import { HiOutlineHomeModern } from "react-icons/hi2";

//import sidebar css from react-pro-sidebar module and our custom css
import "react-pro-sidebar/dist/css/styles.css";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import Logout from "../Home/Logout";

const Header = () => {
  const navigate = useNavigate();
  //create initial menuCollapse state using useState hook
  const [menuCollapse, setMenuCollapse] = useState(false);

  //create a custom function that will change menucollapse state from false to true and true to false
  const menuIconClick = () => {
    //condition checking to change state from true to false and vice versa
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };

  return (
    <>
      <div id="header">
        {/* collapsed props to change menu size using menucollapse state */}
        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "INV" : "Inventory Management"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
              {/* changing menu collapse icon on click */}
              {menuCollapse ? <FiArrowRightCircle /> : <FiArrowLeftCircle />}
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">
              <MenuItem
                active={true}
                onClick={() => navigate("/home")}
                icon={<FiHome />}
              >
                Dashboard
              </MenuItem>
              <Menu iconShape="square">
                <MenuItem icon={<FiLogOut />}>
                  <Logout />
                </MenuItem>
              </Menu>
              <MenuItem
                icon={<AiOutlineAppstoreAdd />}
                onClick={() => {
                  navigate("");
                }}
              >
                Products
              </MenuItem>
              <MenuItem
                icon={<BiArrowToBottom />}
                onClick={() => navigate("/inward")}
              >
                Inwards
              </MenuItem>
              <MenuItem
                icon={<HiOutlineHomeModern />}
                onClick={() => navigate("/godown")}
              >
                Godowns
              </MenuItem>
              <MenuItem
                icon={<BiArrowToTop />}
                onClick={() => navigate("/outward")}
              >
                Deliveries
              </MenuItem>
              <MenuItem
                icon={<AiOutlineStock />}
                onClick={() => navigate("/analytics")}
              >
                Analytics
              </MenuItem>
              <MenuItem
                icon={<BsPeople />}
                onClick={() => navigate("/employees")}
              >
                Employees
              </MenuItem>
              <MenuItem
                icon={<MdOutlineAccountCircle />}
                onClick={() => navigate("/account")}
              >
                Account
              </MenuItem>
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Header;
