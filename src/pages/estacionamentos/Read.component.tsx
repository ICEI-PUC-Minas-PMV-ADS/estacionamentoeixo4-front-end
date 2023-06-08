import ReadComponent from "@src/components/ReadComponent";
import { HeadCell } from "@src/components/TableComponent";
import CoockiesService from "@src/services/auth/CoockieService";

export default class ReadEstacionamento extends ReadComponent {
  cookies: CoockiesService = new CoockiesService();
  constructor(props: never) {
    super(props);
  }
  protected override async colunsTable(): Promise<HeadCell[]> {
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
  protected override async titleTable(): Promise<string> {
    return "Estacionamentos";
  }

  //Url do servico que irá recupera os dados
  protected override async nameServiceTable(): Promise<string> {
    const user = this.cookies.getAdmin();
    return `/estacionamento/${user.id}`;
  }

  protected override async orderByTable(): Promise<string> {
    return "preco";
  }

  protected override async sPathRouteForm(): Promise<string> {
    return "Estacionamento";
  }

}
