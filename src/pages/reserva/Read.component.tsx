import ReadComponent from "@src/components/ReadComponent";
import { HeadCell } from "@src/components/TableComponent";
import CoockiesService from "@src/services/auth/CoockieService";

export default class ReadReservar extends ReadComponent {
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
        id: "duracao",
        numeric: true,
        disablePadding: false,
        fieldType: "time",
        label: "Duração",
      },
      {
        id: "horario_reserva",
        numeric: true,
        disablePadding: false,
        label: "Horário da reserva",
        fieldType: "datetime"
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
    return "Reservas";
  }

  //Url do servico que irá recupera os dados
  protected override async nameServiceTable(): Promise<string> {
    const user = this.cookies.getAdmin();
    return `/reserva/adm/${user.id}`;
  }

  protected override async orderByTable(): Promise<string> {
    return "horario_reserva";
  }

  protected override async sPathRouteForm(): Promise<string> {
    return "Reserva";
  }

}
