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
type TMutationAdm = {
  nome: string;
  email: string;
  uuid_firebase: string;
};
const SignUp = () => {
  const serviceSignup = new AxiosRequest();
  const navigate = useNavigate();

  // const queryClient = useQueryClient();

  //Form  Singin
  const { register, handleSubmit, watch } = useForm<TypeForm>({
    defaultValues: {
      name: "",
      password: "",
      passwordRepeat: "",
    },
  });

  //Mutation para chamar o Me
  const mutationMe = useMutation<
    {
      email: string;
      uuid_firebase: string;
    },
    Error,
    {
      email: string;
      uuid_firebase: string;
    }
  >({
    mutationKey: ["admin_me"],
    mutationFn: async (result) =>
      await serviceSignup.post({ url: "/auth/me", data: result }),
    onSuccess: async (response) => {
      console.log(response);
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
    const { name, email, password, passwordRepeat } = obj;
    if (password.match(passwordRepeat)) {
      // message
    }
    const CallMe = (response) => {
      return mutationMe
        .mutateAsync({
          email: response.email,
          uuid_firebase: response.uuid_firebase,
        })
        .catch((error) => error);
    };

    //Cria conta do admin no firebase
    await signUp(email, password)
      .then(async (response) => {
        //Cadastra no banco admin
        await mutationCreate
          .mutateAsync({
            email: response.user.email as string,
            nome: name,
            uuid_firebase: response.user.uid,
          })
          .then(async () => {
            navigate("/auth/signin");
          })
          .catch(async () => {
            //tenta segunda vez se caso o corra erro
            await mutationCreate
              .mutateAsync({
                email: response.user.email as string,
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
          <Link to="/auth/signin" className="text-primary">
            Login
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignUp;
