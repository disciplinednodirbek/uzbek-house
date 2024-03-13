import { Button, TextField } from "@mui/material";
import HomeBannerImage from "assets/images/desktop-wallpaper.avif";
import SectionCard from "./components/SectionCard";
import BuyHomeIcon from "assets/icons/buy-home.webp";
import SellHomeIcon from "assets/icons/sell-home.webp";
import RentHomeIcon from "assets/icons/rent-home.webp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Carousel from "components/Carousel";

const sectionsList = [
  {
    id: 1,
    name: "Buy a home",
    path: "/buy",
    icon: BuyHomeIcon,
    subTitle: "Find Your Dream Property",
    description:
      "Find your place with an immersive photo experience and the most listings, including things you won’t find anywhere else.",
  },
  {
    id: 2,
    name: "Sell a home",
    path: "/sell",
    icon: SellHomeIcon,
    subTitle: "Connect with Potential Buyers",
    description:
      "No matter what path you take to sell your home, we can help you navigate a successful sale.",
  },
  {
    id: 3,
    name: "Rent a home",
    path: "/rent",
    icon: RentHomeIcon,
    subTitle: "Discover Rental Opportunities",
    description:
      "We’re creating a seamless online experience – from shopping on the largest rental network, to applying, to paying rent.",
  },
];

export default function Home() {
  const recommendedHomes = Array.from({ length: 20 }, (_, index) => index + 1);

  const scrollToRecommended = () => {
    const recommendedSection = document.getElementById("recommended");
    recommendedSection.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${HomeBannerImage})`,
        }}
        className="flex items-center justify-center flex-col !w-full !h-[500px] bg-cover bg-no-repeat"
      >
        <h1 className="text-[36px] text-white p-0 m-0 font-serif mobile:text-[20px] md:text-[30px]">
          Agents. Tours. Loans. Homes.
        </h1>
        <TextField
          type="search"
          className="mobile:w-[90%] md:w-[50%] bg-white rounded !mt-4"
          placeholder="Enter an Address"
        />
      </div>
      <div className="m-8">
        <Carousel title="Recommended for you" data={recommendedHomes} />
        <div className="flex items-center justify-center mt-4 ">
          <Button
            startIcon={<ArrowDownwardIcon />}
            variant="text"
            size="small"
            color="primary"
            onClick={scrollToRecommended}
          >
            More recommended homes
          </Button>
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 py-8 flex-wrap bg-gray-50">
        {sectionsList.map((section) => (
          <div key={section.id} className="sm:w-[100%] lg:w-[25%] h-[500px]">
            <SectionCard section={section} />
          </div>
        ))}
      </div>
      <div className="m-8 py-4" id="recommended">
        <Carousel title="Homes for you" data={recommendedHomes} />
      </div>
    </div>
  );
}
