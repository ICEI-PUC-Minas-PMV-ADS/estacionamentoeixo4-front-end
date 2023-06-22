import React from "react";
import Breadcrumb from "./Breadcrumb";
import FormUiComponent from "./FormUiComponent";

export interface IForm {
  cols?: number;
  label?: string;
  bind: string | null;
  widthField?: string;
  placeholder?: string;
  typeField:
  | "number"
  | "select"
  | "radioButton"
  | "checkbox"
  | "text"
  | "row"
  | "field";
  options?: { key: string | number; value: string | number }[];
  childrens?: IForm[];
  mask?: string;
  maxLength?: number
}

type TState = {
  title: string;
  fields: IForm[];
  model: Object;
  service: string;
  path: string;
};
export default class CrudComponent extends React.Component<
  React.Attributes,
  TState
> {
  constructor(props: any) {
    super(props);
  }

  state: TState = {
    service: "",
    model: {},
    fields: [],
    title: "",
    path: "",
  };

  protected async titleForm(): Promise<string> {
    throw new Error("Faltou implementar o titleForm");
  }
  protected async fieldsForm(): Promise<IForm[]> {
    throw new Error("Faltou implementar o fieldsForm");
  }
  protected async modelForm(): Promise<{
    [key: string]: string | number | [];
  }> {
    throw new Error("Faltou implementar o modelForm");
  }
  protected async serviceForm(): Promise<string> {
    throw new Error("Faltou implementar o serviceForm");
  }

  protected async sPathRouteForm(): Promise<string> {
    throw new Error("Faltou implementar o sPathRouteForm");
  }

  public async modelChangeData(_model: any): Promise<any> {
    return _model;
  }

  async componentDidMount() {
    //Recupera os propertyes
    const title = await this.titleForm();
    const fields = await this.fieldsForm();
    const modelForm = await this.modelForm();
    const path = await this.sPathRouteForm();

    //Service que faz manda a requisção
    const service = await this.serviceForm();

    this.setState((state: TState) => ({
      ...state,
      fields: fields,
      title: title,
      service: service,
      path: path,
    }));
  }

  render() {
    return (
      this.state.title && (
        <>
          <Breadcrumb pageName={this.state.path} />
          <FormUiComponent
            fields={this.state.fields}
            model={this.modelChangeData}
            service={this.state.service}
            title={this.state.title}
          />
        </>
      )
    );
  }
}
