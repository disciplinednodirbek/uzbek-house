import HomeImage from "assets/images/home-banner.png";
import { Link } from "react-router-dom";

export default function AsideNewsCard() {
  return (
    <Link to={`/news/news-details/${1}`}>
      <div className="p-2 hover:shadow-md flex items-start border rounded">
        <img
          src={HomeImage}
          alt="home image"
          className="rounded w-[100px] h-[100%]"
        />
        <div className="px-2">
          <h1 className="text-[14px] font-semibold">
            The Bank of Mom and Dad: How To Compete Against ‘Nepo Homebuyers’...
          </h1>
        </div>
      </div>
    </Link>
  );
}
