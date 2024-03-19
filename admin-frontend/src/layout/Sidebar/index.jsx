import { Link, useLocation } from "react-router-dom";

const pages = [
  {
    name: "Statistics",
    path: "/",
  },
  {
    name: "Admins",
    path: "/admin/admins-list",
  },
  {
    name: "Moderating",
    path: "/moderating/moderating-list",
  },
  {
    name: "News",
    path: "/news/news-list",
  },
  {
    name: "Users",
    path: "/user/users-list",
  },
  {
    name: "Locations",
    path: "/location/locations-list",
  },
  {
    name: "Available time",
    path: "/available-time/available-times-list",
  },
  {
    name: "Conditions",
    path: "/condition/conditions-list",
  },
  {
    name: "Unit types",
    path: "/unit-type/unit-types-list",
  },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div>
      {pages.map((page) => (
        <Link to={page.path} key={page.name} className={`w-full`}>
          <div
            className={`px-4 py-2 rounded-r-md ${
              location.pathname === page.path ? "bg-[#1F2C40] text-white" : ""
            }`}
          >
            {page.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
