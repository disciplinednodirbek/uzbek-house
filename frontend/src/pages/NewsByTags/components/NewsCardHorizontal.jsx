import HomeImage from "assets/images/home-banner.png";

export default function NewsCardHorizontal() {
  return (
    <div className="flex items-start flex-wrap border p-4 rounded">
      <img
        src={HomeImage}
        alt="Home Banner"
        className="mobile:w-full md:w-1/3 rounded"
      />
      <div className="mobile:w-full md:w-2/3 px-4">
        <h1 className="text-[24px] font-bold">
          Generation Z’s Must-Haves When Buying Homes—and the One Thing They
          Refuse To Live Without...
        </h1>
        <p className="text-gray-400 text-[16px] text-wrap mt-3">
          Most of Generation Z believe it’s still possible to become homeowners.
          But there are certain things these buyers refuse to compromise on...
        </p>
        <time className="text-gray-400 text-[16px] text-wrap mt-4 italic">
          01 June 2024
        </time>
      </div>
    </div>
  );
}
