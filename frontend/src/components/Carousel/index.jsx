import { IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeCard from "components/HomeCard";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Carousel({ title, data }) {
  return (
    <div className="relative">
      <div className="flex justify-between">
        <p className="text-[20px]">{title}</p>
        <div className="flex">
          <IconButton size="small" title="Previous" className="prev-button">
            <NavigateBeforeIcon />
          </IconButton>
          <IconButton size="small" title="Next" className="next-button">
            <NavigateNextIcon />
          </IconButton>
        </div>
      </div>
      <div className="mt-4 relative">
        <Swiper
          slidesPerView={4.7}
          spaceBetween={10}
          pagination={{
            type: "progressbar",
            el: ".swiper-custom-pagination",
          }}
          navigation={{ nextEl: ".next-button", prevEl: ".prev-button" }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1600: {
              slidesPerView: 5,
              spaceBetween: 30,
            },
          }}
        >
          {data.map((home, index) => (
            <SwiperSlide key={index}>
              <HomeCard home={home} />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* <div
          className="swiper-custom-pagination"
          style={{
            position: "relative",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            marginTop: 15,
            width: "25%",
            borderRadius: 10,
          }}
        ></div> */}
      </div>
    </div>
  );
}
