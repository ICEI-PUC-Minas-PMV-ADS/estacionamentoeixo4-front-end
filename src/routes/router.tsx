import SignIn from "@src/pages/Authentication/SignIn";
import SignUp from "@src/pages/Authentication/SignUp";
import Analytics from "@src/pages/Dashboard/Analytics";
import Home from "@src/pages/Home";
import Tables from "@src/pages/Tables";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: () => {
      return <Home />;
    },
  },
  {
    path: "/dashboard",
    Component: () => <Analytics />,
    children: [],
  },
  {
    path: "/auth",
    children: [
      {
        path: "auth/signin",
        Component: () => <SignIn />,
      },
      {
        path: "auth/signup",
        Component: () => <SignUp />,
      },
    ],
  },
  {
    path: "/tabelas",
    Component: () => <Tables />,
  },
]);

export default routes;

// <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/adm" element={<Analytics />} />

// <Route path="/calendar" element={<Calendar />} />
// <Route path="/calendar" element={<Calendar />} />
// <Route path="/profile" element={<Profile />} />
// <Route path="/forms/form-elements" element={<FormElements />} />
// <Route path="/forms/form-layout" element={<FormLayout />} />
// <Route path="/tables" element={<Tables />} />
// <Route path="/settings" element={<Settings />} />
// <Route path="/chart" element={<Chart />} />
// <Route path="/ui/alerts" element={<Alerts />} />
// <Route path="/ui/buttons" element={<Buttons />} />
// <Route path="/auth/signin" element={<SignIn />} />
// <Route path="/auth/signup" element={<SignUp />} />
// </Routes>
