import ReadComponent from "@src/components/ReadComponent";
import CoockiesService from "@src/services/auth/CoockieService";
export default class ReadEstacionamento extends ReadComponent {
    cookies = new CoockiesService();
    constructor(props) {
        super(props);
    }
    async colunsTable() {
        return [
            {
                id: "preco",
                numeric: true,
                disablePadding: false,
                label: "Preco",
            },
            {
                id: "vagas_preferenciais",
                numeric: true,
                disablePadding: false,
                label: "Vagas Preferenciais",
            },
            {
                id: "vagas_gerais",
                numeric: true,
                disablePadding: false,
                label: "Vagas Gerais",
            },
            {
                id: "razao_social",
                numeric: true,
                disablePadding: false,
                label: "Razão Social",
            },
        ];
    }
    // Nome explicito na tabela
    async titleTable() {
        return "Estacionamentos";
    }
    //Url do servico que irá recupera os dados
    async nameServiceTable() {
        const user = this.cookies.getAdmin();
        return `/estacionamento/${user.id}`;
    }
    async orderByTable() {
        return "preco";
    }
    async sPathRouteForm() {
        return "Estacionamento";
    }
}
