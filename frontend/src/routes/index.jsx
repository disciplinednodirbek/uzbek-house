import { Routes, Route } from "react-router-dom";
import Layout from "layout";
import About from "pages/about/";
import Home from "pages/home";
import Sell from "pages/Sell";
import Buy from "pages/Buy";
import News from "pages/news";
import NewsDetails from "pages/NewsDetails";
import NewsByTags from "pages/NewsByTags";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/buy" element={<Buy />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/news" element={<News />} />
      <Route path="/news/news-details/:id" element={<NewsDetails />} />
      <Route path="/news/news-by-tags/:tagName" element={<NewsByTags />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
}
