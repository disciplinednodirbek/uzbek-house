import { Routes, Route } from "react-router-dom";
import Layout from "layout";
import Statistics from "pages/Statistics";
import UsersList from "pages/User/UsersList";
import LocationsList from "pages/Location/LocationsList";
import Login from "pages/Login";
import PrivateRoutes from "./private.route";
import AvailableTimesList from "pages/AvailableTime/AvailableTimesList";
import ConditionsList from "pages/Condition/ConditionsList";
import UnitTypesList from "pages/UnitType/UnitTypesList";
import AdminsList from "pages/Admin/AdminsList";
import ModeratingList from "pages/Moderating/ModeratingList";
import ModeratingDetail from "pages/Moderating/ModeratingDetail";
import NewsList from "pages/News/NewsList";
import NewsForm from "pages/News/NewsForm";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Layout />
          </PrivateRoutes>
        }
      />
      <Route
        index
        element={
          <PrivateRoutes>
            <Statistics />
          </PrivateRoutes>
        }
      />
      <Route
        path="/admin/admins-list"
        element={
          <PrivateRoutes>
            <AdminsList />
          </PrivateRoutes>
        }
      />
      <Route
        path="/moderating/moderating-list"
        element={
          <PrivateRoutes>
            <ModeratingList />
          </PrivateRoutes>
        }
      />
      <Route
        path="/news/news-list"
        element={
          <PrivateRoutes>
            <NewsList />
          </PrivateRoutes>
        }
      />
      <Route
        path="/news/news-form"
        element={
          <PrivateRoutes>
            <NewsForm />
          </PrivateRoutes>
        }
      />
      <Route
        path="/moderating/moderating-detail/:id"
        element={
          <PrivateRoutes>
            <ModeratingDetail />
          </PrivateRoutes>
        }
      />
      <Route
        path="/user/users-list"
        element={
          <PrivateRoutes>
            <UsersList />
          </PrivateRoutes>
        }
      />
      <Route
        path="/location/locations-list"
        element={
          <PrivateRoutes>
            <LocationsList />
          </PrivateRoutes>
        }
      />
      <Route
        path="/available-time/available-times-list"
        element={
          <PrivateRoutes>
            <AvailableTimesList />
          </PrivateRoutes>
        }
      />
      <Route
        path="/condition/conditions-list"
        element={
          <PrivateRoutes>
            <ConditionsList />
          </PrivateRoutes>
        }
      />
      <Route
        path="/unit-type/unit-types-list"
        element={
          <PrivateRoutes>
            <UnitTypesList />
          </PrivateRoutes>
        }
      />
    </Routes>
  );
}
