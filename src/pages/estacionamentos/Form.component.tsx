import CrudComponent, { IForm } from "@src/components/CrudComponent";
import CoockiesService from "@src/services/auth/CoockieService";

export default class FormEstacionamento extends CrudComponent {
  cookies: CoockiesService = new CoockiesService();
  constructor(props: never) {
    super(props);
  }

  protected override async fieldsForm(): Promise<IForm[]> {
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

  protected override async titleForm(): Promise<string> {
    return "estacionamento";
  }

  protected override async serviceForm(): Promise<string> {
    const user = this.cookies.getUser();
    return `/estacionamento/${user.id}`;
  }

  protected override async modelForm(): Promise<{
    [key: string]: string | number | [];
  }> {
    return {};
  }

  protected override async sPathRouteForm(): Promise<string> {
    return "Estacionamento";
  }
}
