import CrudComponent, { IForm } from "@src/components/CrudComponent";
import CoockiesService from "@src/services/auth/CoockieService";
import { GeocodingService } from "@src/services/google/geocoding";

type TModel = {
  preco: number;
  vagas_preferenciais: number;
  vagas_gerais: number;
  razao_social;
  cnpj: string;
  endereco: string;
  cep: number;
  bairro: string;
  cidade: string;
  numero: number;
  uf: string;
  lat: number;
  lgt: number;
};
export default class FormReservar extends CrudComponent {
  cookies: CoockiesService = new CoockiesService();
  constructor(props: any) {
    super(props);
  }

  protected override async fieldsForm(): Promise<IForm[]> {
    return [
      {
        typeField: "row",
        cols: 3,
        bind: null,
        childrens: [
          {
            typeField: "text",
            bind: "preco",
            widthField: "w-[100%]",
            placeholder: "Preço",
          },
          {
            typeField: "text",
            widthField: "w-[100%]",
            bind: "vagas_preferenciais",
            placeholder: "Número de vagas preferenciais",
          },
          {
            typeField: "text",
            widthField: "w-[100%]",
            bind: "vagas_gerais",
            placeholder: "Número de vagas gerais",
          },
          {
            typeField: "text",
            bind: "razao_social",
            placeholder: "Razão social",
          },
          {
            typeField: "text",
            bind: "cnpj",
            placeholder: "CNPJ",
          },
        ],
      },
      {
        typeField: "field",
        cols: 2,
        bind: null,
        placeholder: "Endereço",
        childrens: [
          {
            typeField: "text",
            widthField: "w-full",
            bind: "endereco",
            placeholder: "Endereco",
          },
          {
            typeField: "text",
            bind: "cep",
            placeholder: "CEP",
          },
        ],
      },
      {
        typeField: "row",
        cols: 3,
        bind: null,
        childrens: [
          {
            typeField: "text",
            bind: "bairro",
            placeholder: "Bairro",
          },

          {
            typeField: "text",
            bind: "numero",
            placeholder: "Número",
          },
          {
            typeField: "text",
            bind: "cidade",
            placeholder: "Cidade",
          },
          {
            typeField: "text",
            bind: "uf",
            placeholder: "UF",
          },
        ],
      },
    ];
  }

  protected override async titleForm(): Promise<string> {
    return "estacionamento";
  }

  protected override async serviceForm(): Promise<string> {
    const user = this.cookies.getAdmin();
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

  // Método que faz um beforeChangeModel antes de fazer requisição
  async modelChangeData(model: TModel) {
    // const address = `${model?.cidade} ${model?.bairro} ${model?.endereco} ${model?.numero}`;
    // try {
    //   const { lat, lng } = await GeocodingService.getGeocodingByAddress(
    //     address
    //   );
    //   //  Chama o serviço do google e seta a longitude e latitude
    //   model.lat = lat;
    //   model.lgt = lng;
    //   return model;
    // } catch (err) {
    //   console.error(err);
    // }
  }
}
