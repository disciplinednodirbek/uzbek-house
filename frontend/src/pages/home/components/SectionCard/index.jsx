import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./style.css";

export default function SectionCard({ section }) {
  return (
    <div className="house-options-card">
      <article>
        <h2 className="text-[24px] mt-4 font-semibold">{section.name}</h2>
        <div className="title">{section.subTitle}</div>
        <div className="pic">
          <img
            src={section.icon}
            alt={section.name}
            className="w-[100%] h-[100%] object-cover"
          />
        </div>
        <div className="desc">{section.description}</div>
      </article>
      <div className="actions">
        <Link to={section.path} className="btn">
          <button className="btn py-4">
            <span>See your options</span>
            <img
              className="icon"
              src="https://rafaelavlucas.github.io/assets/icons/misc/trade.svg"
            />
          </button>
        </Link>
      </div>
    </div>
  );
}
