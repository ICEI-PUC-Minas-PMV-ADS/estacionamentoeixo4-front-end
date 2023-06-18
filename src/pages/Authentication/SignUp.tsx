/* eslint-disable no-debugger */
import { Link, useNavigate } from "react-router-dom";
import Field, { TypeForm } from "@components/Field";
import { InputAdornment } from "@mui/material";
import Email from "@mui/icons-material/Email";
import Person from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import PasswordInput from "@components/FieldPassword";
import { signUp } from "@services/firebase/signUp";
import { useMutation } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import BackdropComponent from "@src/components/Backdrop";
import { useState } from "react";


type TMutationAdm = {
  nome: string;
  email: string;
  uuid_firebase: string;
};
const SignUp = () => {
  const [isBusy, setBusy] = useState(false)
  const serviceSignup = new AxiosRequest();
  const navigate = useNavigate();


  //Form  Singin
  const { register, handleSubmit, watch } = useForm<TypeForm>({
    defaultValues: {
      name: "",
      password: "",
      passwordRepeat: "",
    },
  });

  //Mutation para criar admin no banco
  const mutationCreate = useMutation<TMutationAdm, Error, TMutationAdm>({
    mutationKey: ["admin_register"],
    mutationFn: async (result) =>
      await serviceSignup.post({
        url: "/administrador",
        data: result,
      }),

  });

  //OnSubmit
  const onSubmit = async (obj) => {
    setBusy(true)
    const { name, email, password, passwordRepeat } = obj;
    if (password.match(passwordRepeat)) {
      // message
    }

    //Cria conta do admin no firebase
    await signUp(email, password)
      .then(async (response) => {
        setBusy(true)
        //Cadastra no banco admin
        await mutationCreate
          .mutateAsync({
            email: response.user.email as string,
            nome: name,
            uuid_firebase: response.user.uid,
          })
          .then(async () => {
            setBusy(false)
            navigate("/signin");
            return;
          })
          .catch(async () => {
            setBusy(false)
            //tenta segunda vez se caso o corra erro
            await mutationCreate
              .mutateAsync({
                email: response.user.email as string,
                nome: name,
                uuid_firebase: response.user.uid,
              })
              .then(async () => {
                setBusy(false)
                navigate("/signin");
              });
          });
      })
      .catch(() => {
        setBusy(false)
        // tratar erro na tela firebase
      }).finally(() => {
        setBusy(false)
      });
  };

  return (
    <form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-2">
        <div className="relative">
          <Field
            register={register}
            name="name"
            defaultValue={watch("name")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" className="mr-1">
                  <Person className="text-primary" />
                </InputAdornment>
              ),
            }}
            variant="filled"
            label="Entre com nome"
            className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
          />
        </div>
      </div>
      <div className="mb-2">
        <Field
          register={register}
          name="email"
          defaultValue={watch("email")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end" className="mr-1">
                <Email className="text-primary" />
              </InputAdornment>
            ),
          }}
          variant="filled"
          label="Entre com email"
          className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
        />
      </div>
      <div className="mb-2">
        <div className="relative">
          <PasswordInput
            defaultValue={watch("password")}
            name={"password"}
            register={register}
            label="Entre com a senha"
            className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
          />
        </div>
      </div>
      <div className="mb-3">
        <div className="relative">
          <PasswordInput
            defaultValue={watch("passwordRepeat")}
            register={register}
            name={"passwordRepeat"}
            label="Repita a senha"
            className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
          />
        </div>
      </div>
      <div className="mb-2">
        <input
          type="submit"
          value="Criar conta"
          className="w-full p-3 text-white transition border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        />
      </div>
      <div className="pb-8 mt-3 text-center">
        <p>
          Ja tem uma conta?{" "}
          <Link to="/signin" className="text-primary">
            Login
          </Link>
        </p>
      </div>
      <BackdropComponent enabled={isBusy} />
    </form>

  );
};

export default SignUp;
