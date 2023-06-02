import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
// import * as React from "react";
// import { IMaskInput } from "react-imask";
// import { NumericFormat, NumericFormatProps } from "react-number-format";
import Box from "@mui/material/Box";
import Field from "./Field";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const FormUiComponent = ({ model, title, service, fields }) => {
    const [modelState, setModelState] = useState({});
    const [titleState, setTitleState] = useState("Undefined");
    const [serviceState, setServiceState] = useState("");
    const [fieldsState, setFieldsState] = useState([]);
    const axios = new AxiosRequest();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm({
        defaultValues: { ...modelState },
    });
    const mutationCrud = useMutation({
        mutationKey: ["crud_mutation"],
        mutationFn: async (data) => await axios.post({ url: serviceState, data }),
    });
    const fnGetPathUrl = () => {
        const [_barra, path, _lixo] = service.split("/");
        return path;
    };
    useEffect(() => {
        setModelState(model);
        setTitleState(title);
        setServiceState(service);
        setFieldsState(fields || []);
    }, [model, title, service, fields]);
    // Fazz o parser do objeto para mandar corretamente
    const modelParser = (data) => {
        const objParser = {};
        Object.keys(data).map((item) => {
            if (item === "cnpj") {
                objParser[item] = data[item];
            }
            else {
                // Verifica se  é number
                const onlyNumbers = new RegExp("^[0-9]+$");
                if (onlyNumbers.test(data[item])) {
                    //Verifica se é decimal
                    objParser[item] = Number(data[item]);
                }
                else {
                    //String
                    objParser[item] = data[item];
                }
            }
        });
        return objParser;
    };
    const onSubmit = async (data) => {
        const dataParser = modelParser(data);
        console.log(data);
        await mutationCrud
            .mutateAsync({ ...dataParser })
            .then((result) => {
            console.log(result);
            navigate(`/dashboard/${fnGetPathUrl()}/read`);
        })
            .catch((err) => {
            throw new Error("Algo aconteceu de errado" + err);
        });
    };
    return (_jsx("div", { className: "flex items-center justify-center w-full h-screen px-4", children: _jsxs(Box, { component: "form", onSubmit: handleSubmit(onSubmit), className: "flex flex-col items-center justify-start w-full min-h-screen p-12 px-20 border rounded-md gap-y-4 border-bodydark2 ", children: [_jsxs("h1", { className: "text-2xl font-bold font-satoshi", children: ["Cadastro do ", titleState] }), fieldsState.length !== 0 ? (fieldsState?.map((item, index) => {
                    //Monta a row se o typeField for igual a row e alimenta com as childrens
                    if (item.typeField === "row") {
                        return (_jsx("div", { className: `grid w-full grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-${item.cols} lg:grid-cols-${item.cols} xl:gap-x-8`, children: item.childrens?.map((child, indexChild) => {
                                return ((child.typeField === "text" ||
                                    child.typeField === "number") && (_jsx(Field, { type: child.typeField, name: child.bind, register: register, variant: "filled", label: child.placeholder, className: "w-full py-3 pl-6 pr-10 text-black border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none " }, indexChild)));
                            }) }, index));
                    }
                    // if (item.typeField === "text") {
                    //   return Field;
                    // }
                })) : (_jsx("h1", { className: "text-2xl" })), _jsx("button", { type: "submit", className: "mt-8 w-[220px]  cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white hover:bg-opacity-90", children: "Cadastrar" })] }) }));
};
export default FormUiComponent;
