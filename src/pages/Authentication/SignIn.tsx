import { Link, useNavigate } from "react-router-dom";
import Field from "@components/Field";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import PasswordInput from "@components/FieldPassword";
import { signIn } from "@services/firebase/signIn";
import { useMutation } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import BackdropComponent from "@src/components/Backdrop";
import { useState } from "react";

export interface IMeMutate {
  email: string;
  uuid_firebase: string;
}
const SignIn = () => {
  const [isBusy, setBusy] = useState(false)
  const serviceSignin = new AxiosRequest();
  // const queryClient = useQueryClient();
  const navigate = useNavigate();

  //Form  Singin
  const { register, handleSubmit } = useForm<{
    [key: string]: string | number;
  }>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //Mutation para chamar o Me
  const mutationMe = useMutation<IMeMutate, Error, IMeMutate>({
    mutationKey: ["me_user"],
    mutationFn: async (result) =>
      await serviceSignin.post({ url: "/auth/me", data: result }),
  });

  const onSubmit = async (data) => {
    setBusy(true)
    signIn(data.email, data.password)
      .then(async (res) => {
        setBusy(false)
        await mutationMe
          .mutateAsync({
            email: res.user.email as string,
            uuid_firebase: res.user.uid,
          })
          .then(() => {
            setBusy(false)
            navigate("/dashboard/home/read");
          })
          .catch(async () => {
            setBusy(false)
            // Tentar fazer a chamanda mais uma vez
            await mutationMe
              .mutateAsync({
                email: res.user.email as string,
                uuid_firebase: res.user.uid,
              })
              .then(() => {
                setBusy(false)
                navigate("/dashboard/home/read");
              })
              .catch((err) => {
                setBusy(false)
                return err
              });
          });
      })
      .catch(() => {
        // Tratar os erros na tela
      }).finally(() => {
        setBusy(false)
      });
  };

  return (
    <form className="w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <div className="relative">
          <Field
            register={register}
            name={"email"}
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
      </div>

      <div className="mb-6">
        <div className="relative">
          <PasswordInput
            name={"password"}
            register={register}
            label="Entre com a senha"
            className="w-full py-3 pl-6 pr-10 border rounded-lg outline-none border-stroke focus:border-primary focus-visible:shadow-none "
          />
        </div>
      </div>

      <div className="mb-5">
        <input
          type="submit"
          value="Entrar"
          className="w-full p-3 text-white border rounded-lg cursor-pointer border-primary bg-primary hover:bg-opacity-90"
        />
      </div>
      <div className="mt-6 text-center">
        <p>
          Ainda não tem conta?{" "}
          <Link to="/signup" className="text-primary">
            Cadastre-se
          </Link>
        </p>
      </div>
      <BackdropComponent enabled={isBusy} />

    </form>
  );
};

export default SignIn;
