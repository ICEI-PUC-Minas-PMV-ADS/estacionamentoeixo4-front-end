import Sidebar from "@components/Sidebar";
import Header from "@components/Header";
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import menu, { menu_inital } from "@src/menu/menu";

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  if (pathname === "/auth/signin") {
    return (
      <main className="flex flex-col w-full h-screen overflow-hidden">
        <div className="mx-auto max-w-screen-2xl">
          <Outlet />
        </div>
      </main>
    );
  }

  if (pathname === "/auth/signup") {
    return (
      <main className="flex flex-col w-full h-screen overflow-hidden">
        <div className="mx-auto max-w-screen-2xl ">
          <Outlet />
        </div>
      </main>
    );
  }

  if (pathname === "/") {
    return (
      <main className="flex flex-col w-full h-screen overflow-x-hidden">
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          aria_control={"sidebar_home"}
          menu={menu_inital}
        />
        {/* <!-- ===== Header Start ===== --> */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* <!-- ===== Header End ===== --> */}
        <div className="mx-auto max-w-screen-2xl ">
          <Outlet />
        </div>
      </main>
    );
  }
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        {pathname !== "/auth/signup" && pathname !== "/auth/signin" ? (
          <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            aria_control={"sidebar_home"}
            menu={menu}
          />
        ) : (
          ""
        )}
        {/* <!-- ===== Sidebar End ===== --> */}
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
              <Outlet />
            </div>
          </main>
          {/* <!-- ===== Main Content End ===== --> */}
        </div>
        {/* <!-- ===== Content Area End ===== --> */}
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
