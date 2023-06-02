import CrudComponent from "@src/components/CrudComponent";
import CoockiesService from "@src/services/auth/CoockieService";
export default class FormEstacionamento extends CrudComponent {
    cookies = new CoockiesService();
    constructor(props) {
        super(props);
    }
    async fieldsForm() {
        return [
            {
                typeField: "row",
                cols: 2,
                bind: null,
                childrens: [
                    {
                        typeField: "text",
                        bind: "preco",
                        placeholder: "Preço",
                    },
                    {
                        typeField: "number",
                        bind: "vagas_preferenciais",
                        placeholder: "Número de vagas preferenciais",
                    },
                    {
                        typeField: "number",
                        bind: "vagas_gerais",
                        placeholder: "Número de vagas gerais",
                    },
                    {
                        typeField: "text",
                        bind: "razao_social",
                        placeholder: "Razão social",
                    },
                    {
                        typeField: "number",
                        bind: "cnpj",
                        placeholder: "CNPJ",
                    },
                ],
            },
        ];
    }
    async titleForm() {
        return "estacionamento";
    }
    async serviceForm() {
        const user = this.cookies.getAdmin();
        return `/estacionamento/${user.id}`;
    }
    async modelForm() {
        return {};
    }
    async sPathRouteForm() {
        return "Estacionamento";
    }
}
