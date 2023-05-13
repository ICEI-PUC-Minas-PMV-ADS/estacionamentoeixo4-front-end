import { Component } from "react";
import EnhancedTable, { Data, HeadCell } from "./TableComponent";
type Tprops = {
  title: string;
  columns: HeadCell[];
};

type TState = {
  title: string;
  columns: HeadCell[];
  rows: Data[];
  orderBy: string;
};
export default abstract class ReadComponent extends Component<Tprops, TState> {
  columns: HeadCell[] = [];
  override state: TState = {
    title: "",
    columns: [],
    rows: [],
    orderBy: "",
  };

  //Monta o title da tabela
  protected async titleTable(): Promise<string> {
    throw new Error("Implementar setTitleTable");
  }
  //Monta as colunas da tabela
  protected async colunsTable(): Promise<HeadCell[]> {
    throw new Error("Implementar colunsTable");
  }
  //Faz a requisição para buscar os dados da tabela
  protected async nameServiceTable(): Promise<string> {
    throw new Error("Implementar ServiceTable");
  }

  //Faz a requisição para buscar os dados da tabela
  protected async orderByTable(): Promise<string> {
    throw new Error("Implementar orderByTable");
  }
  private createData(
    id: number,
    preco: number,
    vagas_preferenciais: number,
    vagas_gerais: number,
    razao_social: string
  ): Data {
    return {
      id,
      preco,
      vagas_preferenciais,
      vagas_gerais,
      razao_social,
    };
  }
  async componentDidMount() {
    //Recupera as propererties  da tabela
    const colunas = await this.colunsTable();
    const title = await this.titleTable();
    const orderBy = await this.orderByTable();
    //Fazer a requisição para o backend recupera os dados
    const rows = [
      this.createData(1, 1.2, 305, 3.7, "Cabeção"),
      this.createData(2, 23.4, 452, 25.0, "JCRastreamentos"),
      this.createData(3, 23.4, 452, 25.0, "JCRastreamentos"),
      this.createData(4, 23.4, 452, 25.0, "JCRastreamentos"),
      this.createData(5, 23.4, 452, 25.0, "JCRastreamentos"),
      this.createData(6, 23.4, 452, 25.0, "JCRastreamentos"),
    ];

    this.setState((state) => ({
      ...state,
      columns: colunas,
      title: title,
      rows: rows,
      orderBy: orderBy,
    }));
  }

  render(): JSX.Element {
    return (
      <EnhancedTable
        orderBy={this.state.orderBy}
        rows={this.state.rows}
        title={this.state.title}
        colunms={this.state?.columns}
      />
    );
  }
}
