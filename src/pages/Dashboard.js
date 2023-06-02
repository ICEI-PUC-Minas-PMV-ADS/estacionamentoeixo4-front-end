import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Grid } from "@mui/material";
import CardOne from "@src/components/CardOne";
import CustomChart from "@src/components/CustomChart";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// ICONS
import PersonIcon from "@mui/icons-material/Person";
import EmojiTransportationIcon from "@mui/icons-material/EmojiTransportation";
import AccessibleIcon from "@mui/icons-material/Accessible";
import ManIcon from "@mui/icons-material/Man";
const Dashboard = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { pathname } = location;
    //Chama a rota index do dashboard  caso não tenha
    useEffect(() => {
        pathname === "/dashboard" && navigate("/dashboard/reservas/read");
    });
    return (_jsx("div", { children: _jsxs(Container, { maxWidth: false, children: [_jsxs(Grid, { container: true, spacing: 3, style: { marginBottom: 30 }, children: [_jsx(Grid, { item: true, xl: 3, lg: 3, sm: 6, xs: 12, children: _jsx(CardOne, { title: "Estacionamentos", count: 4, icon: EmojiTransportationIcon }) }), _jsx(Grid, { item: true, xl: 3, lg: 3, sm: 6, xs: 12, children: _jsx(CardOne, { title: "Clientes", count: 78, icon: PersonIcon }) }), _jsx(Grid, { item: true, xl: 3, lg: 3, sm: 6, xs: 100, children: _jsx(CardOne, { title: "Vagas Gerais", count: 4, icon: ManIcon }) }), _jsx(Grid, { item: true, xl: 3, lg: 3, sm: 6, xs: 10, children: _jsx(CardOne, { title: "Vagas Prioritárias", count: 4, icon: AccessibleIcon }) })] }), _jsx("div", { style: { marginBottom: 10 }, children: _jsx("h1", { style: { marginBottom: 20 }, children: " CONTROLE DE NOVOS USU\u00C1RIOS " }) }), _jsx(CustomChart, {})] }) }));
};
export default Dashboard;
