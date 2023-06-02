import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import Breadcrumb from "./Breadcrumb";
import FormUiComponent from "./FormUiComponent";
export default class CrudComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        service: "",
        fields: [],
        model: {},
        title: "",
        path: "",
    };
    async titleForm() {
        throw new Error("Faltou implementar o titleForm");
    }
    async fieldsForm() {
        throw new Error("Faltou implementar o fieldsForm");
    }
    async modelForm() {
        throw new Error("Faltou implementar o modelForm");
    }
    async serviceForm() {
        throw new Error("Faltou implementar o serviceForm");
    }
    async sPathRouteForm() {
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
        this.setState((state) => ({
            ...state,
            fields: fields,
            model: modelForm,
            title: title,
            service: service,
            path: path,
        }));
    }
    render() {
        return (this.state.title && (_jsxs(_Fragment, { children: [_jsx(Breadcrumb, { pageName: this.state.path }), _jsx(FormUiComponent, { fields: this.state.fields, model: this.state.model, service: this.state.service, title: this.state.title })] })));
    }
}
