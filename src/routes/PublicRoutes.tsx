import { type FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";

export const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};
