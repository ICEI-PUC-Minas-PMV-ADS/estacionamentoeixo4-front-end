import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-debugger */
import { Link, useNavigate } from "react-router-dom";
import Field from "@components/Field";
import { InputAdornment } from "@mui/material";
import Email from "@mui/icons-material/Email";
import Person from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import PasswordInput from "@components/FieldPassword";
import { signUp } from "@services/firebase/signUp";
import { useMutation } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
const SignUp = () => {
    const serviceSignup = new AxiosRequest();
    const navigate = useNavigate();
    //Form  Singin
    const { register, handleSubmit, watch } = useForm({
        defaultValues: {
            name: "",
            password: "",
            passwordRepeat: "",
        },
    });
    //Mutation para criar admin no banco
    const mutationCreate = useMutation({
        mutationKey: ["admin_register"],
        mutationFn: async (result) => await serviceSignup.post({
            url: "/administrador",
            data: result,
        }),
    });
    //OnSubmit
    const onSubmit = async (obj) => {
        const { name, email, password, passwordRepeat } = obj;
        if (password.match(passwordRepeat)) {
            // message
        }
        //Cria conta do admin no firebase
        await signUp(email, password)
            .then(async (response) => {
            //Cadastra no banco admin
            await mutationCreate
                .mutateAsync({
                email: response.user.email,
                nome: name,
                uuid_firebase: response.user.uid,
            })
                .then(async () => {
                navigate("/auth/signin");
                return;
            })
                .catch(async () => {
                //tenta segunda vez se caso o corra erro
                await mutationCreate
                    .mutateAsync({
                    email: response.user.email,
                    nome: name,
                    uuid_firebase: response.user.uid,
                })
                    .then(async () => {
                    navigate("/auth/signin");
                });
            });
        })
            .catch(() => {
            // tratar erro na tela firebase
        });
    };
    return (_jsxs("form", { className: "w-full max-w-xs", onSubmit: handleSubmit(onSubmit), children: [_jsx("div", { className: "mb-2", children: _jsx("div", { className: "relative", children: _jsx(Field, { register: register, name: "name", defaultValue: watch("name"), InputProps: {
                            endAdornment: (_jsx(InputAdornment, { position: "end", className: "mr-1", children: _jsx(Person, { className: "text-primary" }) })),
                        }, variant: "filled", label: "Entre com nome", className: "w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none " }) }) }), _jsx("div", { className: "mb-2", children: _jsx(Field, { register: register, name: "email", defaultValue: watch("email"), InputProps: {
                        endAdornment: (_jsx(InputAdornment, { position: "end", className: "mr-1", children: _jsx(Email, { className: "text-primary" }) })),
                    }, variant: "filled", label: "Entre com email", className: "w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none " }) }), _jsx("div", { className: "mb-2", children: _jsx("div", { className: "relative", children: _jsx(PasswordInput, { defaultValue: watch("password"), name: "password", register: register, label: "Entre com a senha", className: "w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none " }) }) }), _jsx("div", { className: "mb-3", children: _jsx("div", { className: "relative", children: _jsx(PasswordInput, { defaultValue: watch("passwordRepeat"), register: register, name: "passwordRepeat", label: "Repita a senha", className: "w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none " }) }) }), _jsx("div", { className: "mb-2", children: _jsx("input", { type: "submit", value: "Criar conta", className: "w-full p-3 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90" }) }), _jsx("div", { className: "pb-8 mt-3 text-center", children: _jsxs("p", { children: ["Ja tem uma conta?", " ", _jsx(Link, { to: "/auth/signin", className: "text-primary", children: "Login" })] }) })] }));
};
export default SignUp;
