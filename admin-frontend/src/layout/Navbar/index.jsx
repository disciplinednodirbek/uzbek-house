import {
  Avatar,
  Badge,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import LogoIcon from "assets/icons/logo.jpg";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmailIcon from "@mui/icons-material/Email";
import { toast } from "react-toastify";
import { api } from "services/api";

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    try {
      const { data } = await api.post("/auth/logout");
      if (data.success) {
        localStorage.removeItem("token");
        window.location.reload(false);
      }
    } catch (error) {
      toast.error(error?.response?.data?.error);
    }
  }
  return (
    <nav className="w-full h-[70px] shadow-md bg-[#1F2C40] flex items-center justify-between px-4">
      <div>
        <img src={LogoIcon} alt="logo" className="w-[70px] h-[70px]" />
      </div>
      <div className="flex items-center gap-4">
        <IconButton className="!text-white">
          <Badge badgeContent={4} color="primary">
            <EmailIcon />
          </Badge>
        </IconButton>
        <IconButton className="!text-white">
          <Badge badgeContent={12} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Avatar
          className="cursor-pointer"
          alt=""
          src="/static/images/avatar/1.jpg"
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
        />
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>

          <MenuItem onClick={handleMenuClose} className="!text-red-500">
            <ListItemIcon className="!text-red-500">
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText onClick={handleLogout}>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    </nav>
  );
}
