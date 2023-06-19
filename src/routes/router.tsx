import DefaultLayout from "@src/layout/DefaultLayout";
import SignIn from "@src/pages/Authentication/SignIn";
import SignUp from "@src/pages/Authentication/SignUp";
import ComponentAuth from "@src/pages/Authentication/componentes/ComponentAuth";
import DashboardPage from "@src/pages/DashboardPage";
import Home from "@src/pages/Home";
import FormAdm from "@src/pages/administrador/Form.component";
import ReadAdm from "@src/pages/administrador/Read.component";
import FormEstacionamento from "@src/pages/estacionamentos/Form.component";
import ReadEstacionamento from "@src/pages/estacionamentos/Read.component";
import FormUsers from "@src/pages/clientes/Form.component";
import ReadUser from "@src/pages/clientes/Read.component";
import Dashboard from "@src/pages/Dashboard";
import { Outlet, createBrowserRouter } from "react-router-dom";
import Profile from "@src/pages/Profile";
import Settings from "@src/pages/Settings";
import FormReservar from "@src/pages/reserva/Form.component";
import ReadReservar from "@src/pages/reserva/Read.component";

const routes = createBrowserRouter([

  {
    path: "/",
    Component: () => <ComponentAuth />,
    children: [
      {
        index: true,
        path: "/signin",
        Component: () => <SignIn />,
      },
      {
        path: "/signup",
        Component: () => <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: () => {
      return <DefaultLayout />;
    },
    children: [
      {
        path: "",
        Component: () => <DashboardPage />,
        children: [
          {
            path: "home",
            Component: () => <Dashboard />,
          },
          {
            path: "user",
            Component: () => <Outlet />,
            children: [
              {
                path: "settings",
                Component: () => <Settings />,
              },
              {
                path: "profile",
                Component: () => <Profile />,
              },
            ],
          },
          // {
          //   path: "cliente",
          //   children: [
          //     {
          //       path: "read",
          //       Component: () => <ReadUser />,
          //     },
          //     {
          //       path: "create",
          //       Component: () => <FormUsers />,
          //     },
          //     {
          //       path: "edit/:id",
          //       Component: () => <FormUsers />,
          //     },
          //   ],
          // },
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
                Component: () => <ReadReservar />,
              },
              {
                path: "create",
                Component: () => <FormReservar />,
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

]);

export default routes;
