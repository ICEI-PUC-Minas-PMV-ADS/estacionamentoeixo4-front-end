import ReadComponent from "@src/components/ReadComponent";
import { HeadCell } from "@src/components/TableComponent";
import CoockiesService from "@src/services/auth/CoockieService";

export default class ReadCliente extends ReadComponent {
    cookies: CoockiesService = new CoockiesService();

    constructor(props: any) {
        super(props);
    }

    protected override async colunsTable(): Promise<HeadCell[]> {
        return [
            {
                id: "name",
                numeric: true,
                disablePadding: false,
                label: "Nome",
            },
            {
                id: "email",
                numeric: true,
                disablePadding: false,
                label: "Email",
            },
        ];
    }
    // Nome explicito na tabela
    protected override async titleTable(): Promise<string> {
        return "Clientes";
    }

    //Url do servico que irá recupera os dados
    protected override async nameServiceTable(): Promise<string> {
        const user = this.cookies.getAdmin();
        return `/clientes/adm/${user.id}`;
    }

    protected override async orderByTable(): Promise<string> {
        return "name";
    }

    protected override async sPathRouteForm(): Promise<string> {
        return "Cliente";
    }

}
