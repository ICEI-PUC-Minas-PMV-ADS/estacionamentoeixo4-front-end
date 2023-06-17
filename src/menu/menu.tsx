import {
  Person2,
  TableChartOutlined,
  ManageAccounts,
  Garage,
  CarRepair,
  CarCrash,
  NoCrash,
  AddBoxOutlined,
  BusinessOutlined,
  ChatBubbleOutline,
} from "@mui/icons-material";

export type TMenu = {
  title: string;
  link?: string;
  childrens?: TMenu[] | null;
  icon?: JSX.Element;
};

export default [
  {
    title: "Usuários",
    childrens: [
      {
        title: "Visualizar",
        link: "/dashboard/users/read",
        icon: <TableChartOutlined />,
      },
      {
        title: "Cadastrar",
        link: "/dashboard/users/create",
        icon: <AddBoxOutlined />,
      },
    ],
    link: "",
    icon: <Person2 />,
  },
  {
    title: "Administradores",
    link: "",
    icon: <ManageAccounts />,
    childrens: [
      {
        title: "Visualizar",
        link: "/dashboard/administrador/read",
        icon: <TableChartOutlined />,
      },
      {
        title: "Cadastrar",
        link: "/dashboard/administrador/create",
        icon: <AddBoxOutlined />,
      },
    ],
  },
  {
    title: "Estacionamentos",
    childrens: [
      {
        title: "Visualizar",
        link: "/dashboard/estacionamento/read",
        icon: <TableChartOutlined />,
      },
      {
        title: "Cadastrar",
        link: "/dashboard/estacionamento/create",
        icon: <AddBoxOutlined />,
      },
    ],
    link: "",
    icon: <Garage />,
  },
  {
    title: "Vagas",
    childrens: [
      {
        title: "Visualizar",
        link: "/read",
        icon: <TableChartOutlined />,
      },
      {
        title: "Cadastrar",
        link: "/create",
        icon: <AddBoxOutlined />,
      },
    ],
    link: "",
    icon: <CarRepair />,
  },
  {
    title: "Reservas",
    childrens: [
      {
        title: "Visualizar",
        link: "/dashboard/reserva/read",
        icon: <TableChartOutlined />,
      },
      {
        title: "Cadastrar",
        link: "/dashboard/reserva/create",
        icon: <AddBoxOutlined />,
      },
    ],
    link: "",
    icon: <NoCrash />,
  },
  {
    title: "Status das Reservas",
    childrens: null,
    link: "",
    icon: <CarCrash />,
  },
] as TMenu[];

export const menu_inital: TMenu[] = [
  {
    title: "Sobre Nós",
    childrens: null,
    link: "",
    icon: <BusinessOutlined />,
  },
  {
    title: "Fale conosco",
    childrens: null,
    link: "",
    icon: <ChatBubbleOutline />,
  },
];
