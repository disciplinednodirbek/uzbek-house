import { Breadcrumbs, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import NewsCardHorizontal from "./components/NewsCardHorizontal";
import AsideNewsCard from "components/AsideNewsCard";

export default function NewsByTags() {
  return (
    <div>
      <div className="px-12 py-6 bg-white shadow-md">
        <Breadcrumbs aria-label="breadcrumb">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Typography color="text.primary">News by tags #1</Typography>
        </Breadcrumbs>
      </div>
      <div className="flex items-start flex-wrap w-full">
        <div
          className="mobile:px-4 md:px-12 
          mobile:border-b-2 md:border-b-0 md:border-r-2 py-4 mobile:w-full md:w-[75%]"
        >
          <NewsCardHorizontal />
        </div>
        <div className="mobile:w-full md:w-[25%] p-4">
          <h3 className="text-[24px] font-bold">Top news</h3>
          <div className="flex flex-col gap-4 mt-4">
            <AsideNewsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
