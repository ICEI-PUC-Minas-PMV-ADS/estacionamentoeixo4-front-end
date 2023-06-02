import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Component } from "react";
import EnhancedTable from "./TableComponent";
import Breadcrumb from "./Breadcrumb";
export default class ReadComponent extends Component {
    columns = [];
    state = {
        title: "",
        columns: [],
        rows: [],
        orderBy: "",
        service: "",
        path: "",
    };
    //Monta o title da tabela
    async titleTable() {
        throw new Error("Implementar setTitleTable");
    }
    //Monta as colunas da tabela
    async colunsTable() {
        throw new Error("Implementar colunsTable");
    }
    //Faz a requisição para buscar os dados da tabela
    async nameServiceTable() {
        throw new Error("Implementar ServiceTable");
    }
    //Faz a requisição para buscar os dados da tabela
    async orderByTable() {
        throw new Error("Implementar orderByTable");
    }
    async sPathRouteForm() {
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
        return (this.state.service && (_jsxs(_Fragment, { children: [_jsx(Breadcrumb, { pageName: this.state.path }), _jsx(EnhancedTable, { orderBy: this.state.orderBy, service: this.state.service, title: this.state.title, colunms: this.state?.columns })] })));
    }
}
