import DefaultLayout from "@src/layout/DefaultLayout";
import SignIn from "@src/pages/Authentication/SignIn";
import SignUp from "@src/pages/Authentication/SignUp";
import ComponentAuth from "@src/pages/Authentication/componentes/ComponentAuth";
import DashboardPage from "@src/pages/DashboardPage";
import Home from "@src/pages/Home";
import Tables from "@src/pages/Tables";
import FormAdm from "@src/pages/administrador/Form.component";
import ReadAdm from "@src/pages/administrador/Read.component";
import FormEstacionamento from "@src/pages/estacionamentos/Form.component";
import ReadEstacionamento from "@src/pages/estacionamentos/Read.component";
import FormUsers from "@src/pages/users/Form.component";
import ReadUser from "@src/pages/users/Read.component";
import { createBrowserRouter } from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: () => {
      return <DefaultLayout />;
    },
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },

      {
        path: "dashboard",
        Component: () => <DashboardPage />,
        children: [
          {},
          {
            path: "users",
            children: [
              {
                path: "read",
                Component: () => <ReadUser />,
              },
              {
                path: "create",
                Component: () => <FormUsers />,
              },
              {
                path: "edit/:id",
                Component: () => <FormUsers />,
              },
            ],
          },
          {
            path: "estacionamento",

            children: [
              {
                path: "read",
                Component: () => <ReadEstacionamento />,
              },
              {
                path: "create",
                Component: () => <FormEstacionamento />,
              },
              {
                path: "edit/:id",
                Component: () => <FormEstacionamento />,
              },
            ],
          },
          {
            path: "administrador",
            children: [
              {
                path: "read",
                Component: () => <ReadAdm />,
              },
              {
                path: "create",
                Component: () => <FormAdm />,
              },
              {
                path: "edit/:id",
                Component: () => <FormAdm />,
              },
            ],
          },
          {
            path: "reserva",
            children: [
              {
                path: "read",
                Component: () => <ReadAdm />,
              },
              {
                path: "create",
                Component: () => <FormAdm />,
              },
              {
                path: "edit/:id",
                Component: () => <FormAdm />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "auth",
    Component: () => <ComponentAuth />,
    children: [
      {
        index: true,
        path: "signin",
        Component: () => <SignIn />,
      },
      {
        path: "signup",
        Component: () => <SignUp />,
      },
    ],
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
