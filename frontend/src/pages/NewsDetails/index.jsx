import { Breadcrumbs, Chip, Divider, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeImage from "assets/images/home-banner.png";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AsideNewsCard from "components/AsideNewsCard";

export default function NewsDetails() {
  return (
    <div>
      <div className="px-12 py-6 bg-white shadow-md">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/news" className="hover:underline">
            News
          </Link>
          <Typography color="text.primary">News Details #1</Typography>
        </Breadcrumbs>
      </div>
      <div className="flex flex-wrap py-6">
        <div className="mobile:w-full md:w-[75%] mobile:px-4 md:px-12 flex flex-col items-start mobile:border-b-2 md:border-b-0 md:border-r-2">
          <img
            src={HomeImage}
            alt="Home Banner"
            className="mobile:w-full md:w-[95%] h-[500px] rounded object-cover"
          />
          <div className="mt-4 flex items-center gap-2">
            <CalendarMonthIcon className="text-gray-400" />
            <time className="text-gray-400 italic">01 June 2024</time>
          </div>
          <h1 className="text-[28px] font-bold mt-4 text-wrap">
            The Bank of Mom and Dad: How To Compete Against ‘Nepo Homebuyers’
          </h1>
          <p className="text-gray-400 text-[16px] text-wrap mt-3">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
            doloribus consequuntur sapiente veritatis excepturi fugiat. Deleniti
            quos commodi rem, reprehenderit asperiores beatae amet odio
            repellendus assumenda eveniet, quae ab natus. Lorem, ipsum dolor sit
            amet consectetur adipisicing elit. Est doloribus consequuntur
            sapiente veritatis excepturi fugiat. Deleniti quos commodi rem,
            reprehenderit asperiores beatae amet odio repellendus assumenda
            eveniet, quae ab natus. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. Est doloribus consequuntur sapiente veritatis
            excepturi fugiat. Deleniti quos commodi rem, reprehenderit
            asperiores beatae amet odio repellendus assumenda eveniet, quae ab
            natus. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
            doloribus consequuntur sapiente veritatis excepturi fugiat. Deleniti
            quos commodi rem, reprehenderit asperiores beatae amet odio
            repellendus assumenda eveniet, quae ab natus.
          </p>
        </div>
        <div className="mobile:w-full md:w-[25%] p-4">
          <h3 className="text-[20px] font-bold">Related tages</h3>
          <div className="flex items-center flex-wrap mt-4 gap-4">
            <Link to={`/news/news-by-tags/${`buying-home`}`}>
              <Chip
                label="Buying home"
                className="!text-[17px] hover:underline"
              />
            </Link>
            <Link to={`/news/news-by-tags/${`selling-home`}`}>
              <Chip
                label="Selling home"
                className="!text-[17px] hover:underline"
              />
            </Link>
            <Chip label="Home improvement" className="!text-[17px]" />
            <Chip label="Home loan" className="!text-[17px]" />
            <Chip label="Home loan" className="!text-[17px]" />
          </div>
          <Divider className="!my-4" />
          <div className="flex flex-col gap-4">
            <AsideNewsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
