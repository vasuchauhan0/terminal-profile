import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const FrontendLayout = () => {
  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col">
      <Header />

      <main className="flex-1 pt-10">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default FrontendLayout;
