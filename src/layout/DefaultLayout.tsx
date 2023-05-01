import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();
  const { pathname } = location;

  if (pathname === "/auth/signin") {
    return (
      <main>
        <div className="mx-auto max-w-screen-2xl">
          {children}
        </div>
      </main>
    );
  }
  if (pathname === "/auth/signup") {
    return (
      <main>
        <div className="mx-auto max-w-screen-2xl ">
          {children}
        </div>
      </main>
    );
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="flex h-screen overflow-hidden">
        {/* <!-- ===== Sidebar Start ===== --> */}
        { pathname !== "/auth/signup" && pathname !== "/auth/signin" ?
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        :''
      }
      {/* <!-- ===== Sidebar End ===== --> */}
        {/* <!-- ===== Content Area Start ===== --> */}
        <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
          {/* <!-- ===== Header Start ===== --> */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Header End ===== --> */}

          {/* <!-- ===== Main Content Start ===== --> */}
          <main>
            <div className="p-4 mx-auto max-w-screen-2xl md:p-6 2xl:p-10">
              {children}
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
