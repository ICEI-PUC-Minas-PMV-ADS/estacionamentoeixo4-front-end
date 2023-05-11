import { Link } from "react-router-dom";
import Field from "@components/Field";
import { useForm } from "react-hook-form";
import { InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import PasswordInput from "@components/FieldPassword";
import { signIn } from "@services/firebase/signIn";
const SignIn = () => {
  const { register, handleSubmit, getValues } = useForm<{
    [key: string]: string | number;
  }>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    signIn(data.email, data.password);
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
      {getValues("password")}
    </form>
  );
};

export default SignIn;
