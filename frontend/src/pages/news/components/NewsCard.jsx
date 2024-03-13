import HomeImage from "assets/images/home-banner.png";
import { Link } from "react-router-dom";

export default function NewsCard() {
  return (
    <div className="!rounded-lg border hover:shadow-md w-[320px]">
      <img src={HomeImage} alt="home image" className="rounded-t-lg " />
      <div className="p-4">
        <h3 className="font-bold text-[20px] text-wrap">
          The Bank of Mom and Dad: How To Compete Against ‘Nepo Homebuyers’
        </h3>
        <p className="text-gray-400 text-[14px] text-wrap mt-3">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est
          doloribus consequuntur sapiente veritatis excepturi fugiat. Deleniti
          quos commodi rem, reprehenderit asperiores beatae amet odio
          repellendus assumenda eveniet, quae ab natus.{" "}
          <Link to={`/news/news-details/${1}`} className="text-blue-500">
            Read more...
          </Link>
        </p>
      </div>
    </div>
  );
}
