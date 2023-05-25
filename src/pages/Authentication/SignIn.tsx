import { Link, useNavigate } from "react-router-dom";
import Field from "@components/Field";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import PasswordInput from "@components/FieldPassword";
import { signIn } from "@services/firebase/signIn";
import { useMutation, useQueryClient } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";

export interface IMeMutate {
  email: string;
  uuid_firebase: string;
}
const SignIn = () => {
  const serviceSignin = new AxiosRequest();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  //Form  Singin
  const { register, handleSubmit, getValues } = useForm<{
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
    signIn(data.email, data.password)
      .then(async (res) => {
        await mutationMe
          .mutateAsync({
            email: res.user.email as string,
            uuid_firebase: res.user.uid,
          })
          .then(() => {
            navigate("/dashboard/home/read");
          })
          .catch(async () => {
            // Tentar fazer a chamanda mais uma vez
            await mutationMe
              .mutateAsync({
                email: res.user.email as string,
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
          <Link to="/auth/signup" className="text-primary">
            Cadastre-se
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignIn;
