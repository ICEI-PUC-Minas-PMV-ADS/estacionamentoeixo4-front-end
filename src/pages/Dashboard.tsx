import { Container, Grid } from "@mui/material";
import CardOne from "@src/components/CardOne";
import CustomChart from "@src/components/CustomChart";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

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

  return (
    <div>
      <Container maxWidth={false}>
        <Grid container spacing={3} style={{ marginBottom: 30 }}>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CardOne
              title={"Estacionamentos"}
              count={4}
              icon={EmojiTransportationIcon}
            />
          </Grid>

          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <CardOne title={"Clientes"} count={78} icon={PersonIcon} />
          </Grid>

          <Grid item xl={3} lg={3} sm={6} xs={100}>
            <CardOne title={"Vagas Gerais"} count={4} icon={ManIcon} />
          </Grid>

          <Grid item xl={3} lg={3} sm={6} xs={10}>
            <CardOne
              title={"Vagas Prioritárias"}
              count={4}
              icon={AccessibleIcon}
            />
          </Grid>
        </Grid>

        <div style={{ marginBottom: 10 }}>
          <p1 style={{ marginBottom: 20 }}> CONTROLE DE NOVOS USUÁRIOS </p1>
        </div>

        <CustomChart />
      </Container>
    </div>
  );
};
export default Dashboard;
