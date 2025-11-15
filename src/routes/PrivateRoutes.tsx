import { type FC } from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import WaitingRoom from "../pages/WaitingRoom";
import WaitingRoomUser from "../pages/WaitingRoomUser";

export const PrivateRoutes: FC = () => {
  return (
    <Routes>
      {/* Standalone routes without navbar - must come first */}
      <Route path="/waiting-room" element={<WaitingRoom />} />
      <Route path="/waiting-room-user" element={<WaitingRoomUser />} />

      {/* Routes with MainLayout (includes Navbar) */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>

      {/* Catch-all redirect to home */}
      <Route path="*" element={<MainLayout />}>
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  );
};
