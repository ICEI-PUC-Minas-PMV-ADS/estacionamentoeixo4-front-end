import { Component } from "react";
import EnhancedTable, { Data, HeadCell } from "./TableComponent";
import Breadcrumb from "./Breadcrumb";

type TState = {
  title: string;
  columns: HeadCell[];
  rows: Data[];
  orderBy: string;
  service: string;
  path: string;
};
export default abstract class ReadComponent extends Component<
  React.Attributes,
  TState
> {
  columns: HeadCell[] = [];
  override state: TState = {
    title: "",
    columns: [],
    rows: [],
    orderBy: "",
    service: "",
    path: "",
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

  protected async sPathRouteForm(): Promise<string> {
    throw new Error("Faltou implementar o sPathRouteForm");
  }

  async componentDidMount() {
    //Recupera as propererties  da tabela
    const colunas = await this.colunsTable();
    const title = await this.titleTable();
    const orderBy = await this.orderByTable();
    const path = await this.sPathRouteForm();

    //Fazer a requisição para o backend para  recupera os dados
    const service = await this.nameServiceTable();
    this.setState((state) => ({
      ...state,
      columns: colunas,
      title: title,
      service: service,
      orderBy: orderBy,
      path: path,
    }));
  }

  render() {
    return (
      this.state.service && (
        <>
          <Breadcrumb pageName={this.state.path} />
          <EnhancedTable
            orderBy={this.state.orderBy}
            service={this.state.service}
            title={this.state.title}
            colunms={this.state?.columns}
          />
        </>
      )
    );
  }
}
