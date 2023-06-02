import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link, useNavigate } from "react-router-dom";
import Field from "@components/Field";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import PasswordInput from "@components/FieldPassword";
import { signIn } from "@services/firebase/signIn";
import { useMutation } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
const SignIn = () => {
    const serviceSignin = new AxiosRequest();
    // const queryClient = useQueryClient();
    const navigate = useNavigate();
    //Form  Singin
    const { register, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    //Mutation para chamar o Me
    const mutationMe = useMutation({
        mutationKey: ["me_user"],
        mutationFn: async (result) => await serviceSignin.post({ url: "/auth/me", data: result }),
    });
    const onSubmit = async (data) => {
        signIn(data.email, data.password)
            .then(async (res) => {
            await mutationMe
                .mutateAsync({
                email: res.user.email,
                uuid_firebase: res.user.uid,
            })
                .then(() => {
                navigate("/dashboard/home/read");
            })
                .catch(async () => {
                // Tentar fazer a chamanda mais uma vez
                await mutationMe
                    .mutateAsync({
                    email: res.user.email,
                    uuid_firebase: res.user.uid,
                })
                    .then(() => {
                    navigate("/dashboard/home/read");
                })
                    .catch((err) => err);
            });
        })
            .catch(() => {
            // Tratar os erros na tela
        });
    };
    return (_jsxs("form", { className: "w-full max-w-xs", onSubmit: handleSubmit(onSubmit), children: [_jsx("div", { className: "mb-4", children: _jsx("div", { className: "relative", children: _jsx(Field, { register: register, name: "email", InputProps: {
                            endAdornment: (_jsx(InputAdornment, { position: "end", className: "mr-1", children: _jsx(Email, { className: "text-primary" }) })),
                        }, variant: "filled", label: "Entre com email", className: "w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none " }) }) }), _jsx("div", { className: "mb-6", children: _jsx("div", { className: "relative", children: _jsx(PasswordInput, { name: "password", register: register, label: "Entre com a senha", className: "w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none " }) }) }), _jsx("div", { className: "mb-5", children: _jsx("input", { type: "submit", value: "Entrar", className: "w-full p-3 text-white border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90" }) }), _jsx("div", { className: "mt-6 text-center", children: _jsxs("p", { children: ["Ainda n\u00E3o tem conta?", " ", _jsx(Link, { to: "/auth/signup", className: "text-primary", children: "Cadastre-se" })] }) })] }));
};
export default SignIn;
