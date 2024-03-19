import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function AdminCard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ maxWidth: 345, position: "relative" }}>
      <IconButton className="!absolute top-0 right-0">
        <MoreVertIcon
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleMenuClick}
        />
      </IconButton>
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
          <ListItemIcon className="!text-orange-500">
            <EditIcon />
          </ListItemIcon>
          <ListItemText className="!text-orange-500">Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon className="!text-red-600">
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText className="!text-red-600">Delete</ListItemText>
        </MenuItem>
      </Menu>
      <CardMedia
        sx={{
          height: 140,
          borderRadius: "50%",
          width: 140,
          margin: "auto",
          marginTop: 2,
        }}
        image="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        title="Avatar"
      />

      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          Nodirbek Abduvahhobov
        </Typography>
        <Typography gutterBottom variant="body1" component="div">
          nodirbekabduvahhobov202@gmail.com
        </Typography>
      </CardContent>
    </Card>
  );
}
