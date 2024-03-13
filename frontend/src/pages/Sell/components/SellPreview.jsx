import * as React from "react";
import Logo from "assets/icons/logo.jpg";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { Avatar, Chip, ImageList, ImageListItem } from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import ConstructionIcon from "@mui/icons-material/Construction";
import HotelIcon from "@mui/icons-material/Hotel";
import BathroomIcon from "@mui/icons-material/Bathroom";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BalconyIcon from "@mui/icons-material/Balcony";
import LabelIcon from "@mui/icons-material/Label";
import KitchenIcon from "@mui/icons-material/Kitchen";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Map from "components/Map";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1549388604-817d15aa0110",
    title: "Bed",
  },
  {
    img: "https://images.unsplash.com/photo-1525097487452-6278ff080c31",
    title: "Books",
  },
  {
    img: "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6",
    title: "Sink",
  },
  {
    img: "https://images.unsplash.com/photo-1563298723-dcfebaa392e3",
    title: "Kitchen",
  },
  {
    img: "https://images.unsplash.com/photo-1588436706487-9d55d73a39e3",
    title: "Blinds",
  },
  {
    img: "https://images.unsplash.com/photo-1574180045827-681f8a1a9622",
    title: "Chairs",
  },
  {
    img: "https://images.unsplash.com/photo-1530731141654-5993c3016c77",
    title: "Laptop",
  },
  {
    img: "https://images.unsplash.com/photo-1481277542470-605612bd2d61",
    title: "Doors",
  },
  {
    img: "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee",
    title: "Storage",
  },
  {
    img: "https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62",
    title: "Candle",
  },
  {
    img: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4",
    title: "Coffee table",
  },
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SellPreview({ open, onClose, formValues }) {
  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar className="bg-[#1F2C40] d-flex items-center justify-between">
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
              title="Close"
            >
              <CloseIcon />
            </IconButton>

            <img src={Logo} width={70} height={70} />

            <Button
              autoFocus
              color="inherit"
              title="Save"
              onClick={onClose}
              variant="outlined"
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <div className="p-8">
          <ImageList
            sx={{ width: "100%", maxHeight: 400, overflowY: "scroll" }}
            variant="standard"
            cols={2}
            gap={8}
          >
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                  style={{ height: 400 }}
                />
              </ImageListItem>
            ))}
          </ImageList>
          <div className="flex flex-wrap items-start mt-4">
            <div className="mobile:w-full md:w-[80%] border-r px-4">
              <div className="flex items-center justify-between flex-wrap">
                <div>
                  <p className="text-[#1F2C40] text-[34px] font-bold">
                    {formValues.price}
                  </p>
                  <p className="text-gray-400 text-[18px]">
                    {formValues.address}
                  </p>
                </div>
                <div className="flex gap-6">
                  <div>
                    <p className="text-[28px] font-bold text-gray-400">
                      {formValues.bedroom_count}
                    </p>
                    <p className="text-gray-600 text-[20px]">beds</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[28px] font-bold">
                      {formValues.bathroom_count}
                    </p>
                    <p className="text-gray-600 text-[20px]">baths</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-[28px] font-bold">
                      {formValues.square_yard}
                    </p>
                    <p className="text-gray-600 text-[20px]">sqft</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 flex items-center justify-start gap-4 flex-wrap">
                <Chip
                  clickable
                  icon={<ConstructionIcon />}
                  label={`Built in ${formValues.year_build}`}
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
                <Chip
                  clickable
                  icon={<HotelIcon />}
                  label={`${formValues.bedroom_count} Bedroom`}
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
                <Chip
                  clickable
                  icon={<BathroomIcon />}
                  label={`${formValues.bathroom_count} Bathroom`}
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
                <Chip
                  clickable
                  icon={<BalconyIcon />}
                  label={`${
                    formValues.balcony === 2 ? "Included" : "No"
                  } Balcony`}
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
                <Chip
                  clickable
                  icon={<KitchenIcon />}
                  label={`${formValues.kitchen_count} Kitchen`}
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
                <Chip
                  clickable
                  icon={<SquareFootIcon />}
                  label={`${formValues.square_yard} sqft`}
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
                <Chip
                  clickable
                  icon={
                    <LabelIcon
                      color={
                        formValues.current_condition === 1 ? "success" : "error"
                      }
                    />
                  }
                  label={`In ${
                    formValues.current_condition === 1 ? "good" : "bad"
                  } condition`}
                  variant="outlined"
                  color={
                    formValues.current_condition === 1 ? "success" : "error"
                  }
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
                <Chip
                  clickable
                  icon={<AccessTimeIcon color="primary" />}
                  label={`Accessible time: ${
                    (formValues.available_time === 1 && "Morning") ||
                    (formValues.available_time === 2 && "Afternoon") ||
                    (formValues.available_time === 3 && "Evening")
                  }`}
                  variant="outlined"
                  color="primary"
                  className="!p-2 !text-[18px] !rounded-[10px]"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-[#1F2C40] text-[20px] font-bold">
                  Description
                </h4>
                <p>{formValues.maintenance_description}</p>
              </div>
              <div className="mt-8">
                <Map />
              </div>
            </div>
            {/* User info */}
            <div className="p-4 mobile:w-full md:w-[20%] text-wrap">
              <Avatar className="!w-[75px] !h-[75px] mx-auto" />
              <h2 className="mt-4 text-center text-[28px] font-bold">
                {formValues.fullname}
              </h2>
              <div className="flex break-all items-start justify-start mt-4 mx-auto">
                <Chip
                  clickable
                  icon={<LocalPhoneIcon />}
                  className="!text-center !text-[20px] !w-full !rounded-[10px]"
                  label={formValues.phone_number}
                  sx={{
                    height: "auto",
                    "& .MuiChip-label": {
                      display: "block",
                      whiteSpace: "normal",
                    },
                  }}
                />
              </div>
              <div className="flex break-all items-start justify-start mt-4  mx-auto">
                <Chip
                  clickable
                  icon={<EmailIcon />}
                  className="!text-[16px] !w-full !rounded-[10px]"
                  label={formValues.email}
                  sx={{
                    height: "auto",
                    "& .MuiChip-label": {
                      display: "block",
                      whiteSpace: "normal",
                    },
                  }}
                />
                d
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}
