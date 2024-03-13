import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea, IconButton, Menu, MenuItem } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useState } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

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

export default function HomeCard() {
  const [isFavorite, setFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ width: 320 }}>
      <CardActionArea>
        <div className="relativew-full">
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {itemData.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item.img}
                  alt=""
                  className="object-cover h-[200px] w-full"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="absolute top-1 right-2 z-50">
            {isFavorite ? (
              <div onClick={() => setFavorite(!isFavorite)}>
                <FavoriteIcon color="error" />
              </div>
            ) : (
              <div onClick={() => setFavorite(!isFavorite)}>
                <FavoriteIcon className="text-white" />
              </div>
            )}
          </div>
        </div>
        <CardContent>
          <div className="flex items-center justify-between">
            <Typography variant="h5" component="div">
              $100,000
            </Typography>
            <IconButton
              color="primary"
              id="menu-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>Hide</MenuItem>
              <MenuItem onClick={handleClose}>Share</MenuItem>
            </Menu>
          </div>

          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
