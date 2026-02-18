import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Sidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-zinc-950 text-white">

      {/* Sidebar */}
      <Sidebar />

      {/* Admin Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminLayout;
