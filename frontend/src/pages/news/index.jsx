import { Link } from "react-router-dom";
import NewsCard from "./components/NewsCard";

export default function News() {
  return (
    <div>
      <div className="text-center mt-8">
        <h1 className="text-3xl text-bold text-gray-600 border-y-2 border-[#1F2C40] inline px-12 py-2">
          Buying
        </h1>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-4 p-4 mt-8">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
      <div className="text-center mt-4">
        <Link
          to="/news"
          className="py-2 px-12 border border-blue-500 text-blue-500
          hover:bg-blue-500 hover:text-white rounded-[50px] inline"
        >
          More buying news...
        </Link>
      </div>
      <div className="text-center mt-12">
        <h1 className="text-3xl text-bold text-gray-600 border-y-2 border-[#1F2C40] inline px-12 py-2">
          Selling
        </h1>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-4 p-4 mt-8">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
      <div className="text-center mt-4">
        <Link
          to="/news"
          className="py-2 px-12 border border-blue-500 text-blue-500
          hover:bg-blue-500 hover:text-white rounded-[50px] inline"
        >
          More selling news...
        </Link>
      </div>
      <div className="text-center mt-12">
        <h1 className="text-3xl text-bold text-gray-600 border-y-2 border-[#1F2C40] inline px-12 py-2">
          Home Improvement
        </h1>
      </div>
      <div className="flex items-center justify-center flex-wrap gap-4 p-4 mt-8">
        <NewsCard />
        <NewsCard />
        <NewsCard />
        <NewsCard />
      </div>
      <div className="text-center mt-4 pb-4">
        <Link
          to="/news"
          className="py-2 px-12 border border-blue-500 text-blue-500
          hover:bg-blue-500 hover:text-white rounded-[50px] inline"
        >
          More home improvement news...
        </Link>
      </div>
    </div>
  );
}
