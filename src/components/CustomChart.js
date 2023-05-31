import { jsx as _jsx } from "react/jsx-runtime";
import Paper from "@mui/material/Paper";
import { Line } from "react-chartjs-2";
import { Chart, LinearScale, CategoryScale, PointElement, LineElement, } from "chart.js";
Chart.register(LinearScale, CategoryScale, PointElement, LineElement);
const ChartComponent = () => {
    // Dados do gráfico
    const data = {
        labels: [
            "Janeiro",
            "Fevereiro",
            "Março",
            "Abril",
            "Maio",
            "Junho",
            "Julho",
            "Agosto",
            "Setembro",
            "Outubro",
            "Novembro",
            "Dezembro",
        ],
        datasets: [
            {
                label: "Vendas",
                data: [12, 19, 3, 50, 2, 3, 50, 60, 70, 80, 90, 10],
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
            },
        ],
    };
    // Opções do gráfico
    const options = {
        scales: {
            y: {
                min: 0,
                max: 100, // Valor máximo do eixo Y
            },
        },
    };
    return (_jsx(Paper, { elevation: 3, style: { padding: "20px" }, children: _jsx(Line, { data: data, options: options }) }));
};
export default ChartComponent;
