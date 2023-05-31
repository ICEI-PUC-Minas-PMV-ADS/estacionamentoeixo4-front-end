import { jsx as _jsx } from "react/jsx-runtime";
import { Person2, TableChartOutlined, ManageAccounts, Garage, CarRepair, CarCrash, NoCrash, AddBoxOutlined, BusinessOutlined, ChatBubbleOutline, } from "@mui/icons-material";
export default [
    {
        title: "Usuários",
        childrens: [
            {
                title: "Visualizar",
                link: "/dashboard/users/read",
                icon: _jsx(TableChartOutlined, {}),
            },
            {
                title: "Cadastrar",
                link: "/dashboard/users/create",
                icon: _jsx(AddBoxOutlined, {}),
            },
        ],
        link: "",
        icon: _jsx(Person2, {}),
    },
    {
        title: "Administradores",
        link: "",
        icon: _jsx(ManageAccounts, {}),
        childrens: [
            {
                title: "Visualizar",
                link: "/dashboard/administrador/read",
                icon: _jsx(TableChartOutlined, {}),
            },
            {
                title: "Cadastrar",
                link: "/dashboard/administrador/create",
                icon: _jsx(AddBoxOutlined, {}),
            },
        ],
    },
    {
        title: "Estacionamentos",
        childrens: [
            {
                title: "Visualizar",
                link: "/dashboard/estacionamento/read",
                icon: _jsx(TableChartOutlined, {}),
            },
            {
                title: "Cadastrar",
                link: "/dashboard/estacionamento/create",
                icon: _jsx(AddBoxOutlined, {}),
            },
        ],
        link: "",
        icon: _jsx(Garage, {}),
    },
    {
        title: "Vagas",
        childrens: [
            {
                title: "Visualizar",
                link: "/read",
                icon: _jsx(TableChartOutlined, {}),
            },
            {
                title: "Cadastrar",
                link: "/create",
                icon: _jsx(AddBoxOutlined, {}),
            },
        ],
        link: "",
        icon: _jsx(CarRepair, {}),
    },
    {
        title: "Reservas",
        childrens: [
            {
                title: "Visualizar",
                link: "/read",
                icon: _jsx(TableChartOutlined, {}),
            },
            {
                title: "Cadastrar",
                link: "/create",
                icon: _jsx(AddBoxOutlined, {}),
            },
        ],
        link: "",
        icon: _jsx(NoCrash, {}),
    },
    {
        title: "Status das Reservas",
        childrens: null,
        link: "",
        icon: _jsx(CarCrash, {}),
    },
];
export const menu_inital = [
    {
        title: "Sobre Nós",
        childrens: null,
        link: "",
        icon: _jsx(BusinessOutlined, {}),
    },
    {
        title: "Fale conosco",
        childrens: null,
        link: "",
        icon: _jsx(ChatBubbleOutline, {}),
    },
];
