import React from "react";
import Breadcrumb from "./Breadcrumb";
import FormUiComponent from "./FormUiComponent";

export interface IForm {
  cols?: number;
  label?: string;
  bind: string | null;
  placeholder?: string;
  typeField: "number" | "select" | "radioButton" | "checkbox" | "text" | "row";
  options?: { key: string | number; value: string | number }[];
  childrens?: IForm[];
}

type TState = {
  title: string;
  fields: IForm[];
  model: object;
  service: string;
  path: string;
};
export default class CrudComponent extends React.Component<
  React.Attributes,
  TState
> {
  constructor(props: never) {
    super(props);
  }

  state: TState = {
    service: "",
    fields: [],
    model: {},
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
      model: modelForm,
      title: title,
      service: service,
      path: path,
    }));
  }

  render() {
    return (
      <>
        this.state.title && (
        <Breadcrumb pageName={this.state.path} />
        <FormUiComponent
          fields={this.state.fields}
          model={this.state.model}
          service={this.state.service}
          title={this.state.title}
        />
        )
      </>
    );
  }
}
