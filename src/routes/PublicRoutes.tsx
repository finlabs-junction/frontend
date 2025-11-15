import { type FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import PitchDeck from "../components/Pitchdeck";

export const PublicRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/pitchdeck" element={<PitchDeck />} />
      <Route path="/login" element={<Login />} />

      <Route path="*" element={<Navigate replace to="/login" />} />
    </Routes>
  );
};
