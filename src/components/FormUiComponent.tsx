// import * as React from "react";
// import { IMaskInput } from "react-imask";
// import { NumericFormat, NumericFormatProps } from "react-number-format";
import Box from "@mui/material/Box";
import Field from "./Field";
import { useForm } from "react-hook-form";
import { IForm } from "./CrudComponent";
import { useMutation } from "react-query";
import AxiosRequest from "@src/services/axiosRequests/axiosRequests";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { GeocodingService } from "@src/services/google/geocoding";

export interface IProps {
  model: object;
  title: string;
  service: string;
  fields: IForm[];
}

const FormUiComponent = ({ model, title, service, fields }: IProps) => {
  const [modelState, setModelState] = useState(model || {});
  const [titleState, setTitleState] = useState("Undefined");
  const [serviceState, setServiceState] = useState("");
  const [fieldsState, setFieldsState] = useState<IForm[]>([]);

  const axios = new AxiosRequest();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<{
    [key: string]: any;
  }>({
    defaultValues: { ...modelState },
  });
  const mutationCrud = useMutation<any, Error, any>({
    mutationKey: ["crud_mutation"],
    mutationFn: async (data) => await axios.post({ url: serviceState, data }),
  });

  const fnGetPathUrl = () => {
    const [_barra, path, _lixo] = service.split("/");
    return path;
  };

  const geocoding = async (model) => {
    const address = `${model?.endereco} ${model?.numero} ${model?.bairro} ${model?.cidade}`;
    try {
      const { lat, lng } = await GeocodingService.getGeocodingByAddress(
        address
      );
      //  Chama o serviço do google e seta a longitude e latitude
      model.lat = lat;
      model.lgt = lng;
      return model;
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setModelState(model || {});
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
      } else {
        // Verifica se  é number
        const onlyNumbers = new RegExp("^[0-9]+$");
        if (onlyNumbers.test(data[item])) {
          //Verifica se é decimal
          objParser[item] = Number(data[item]);
        } else {
          //String
          objParser[item] = data[item];
        }
      }
    });
    return objParser;
  };

  const onSubmit = async (data: any) => {
    const model = await geocoding(data || {});
    const dataParser = modelParser(model);
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

  return (
    <div className="flex h-auto w-full items-center justify-center px-4">
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-auto w-full flex-col items-center justify-center gap-y-4 rounded-md border border-bodydark2 p-12 px-10 "
      >
        <h1 className="mb-10 font-satoshi text-2xl font-bold ">
          Cadastro do {titleState}
        </h1>
        {fieldsState.length !== 0 ? (
          fieldsState?.map((item, index) => {
            //Monta a row se o typeField for igual a row e alimenta com as childrens
            if (item.typeField === "row" || item.typeField === "field") {
              return (
                <div key={index} className={`h-auto w-full `}>
                  {item.typeField === "field" && (
                    <h1 className="text-1xl left-0 mb-4 mr-auto mt-10 font-satoshi font-semibold">
                      {item.placeholder}
                    </h1>
                  )}
                  <div
                    key={index}
                    className={`grid w-full  grid-cols-1 items-start  justify-start gap-x-2   gap-y-4 sm:grid-cols-${
                      Number(item.cols) - 1
                    } md:grid-cols-${Number(item.cols)} xl:grid-cols-${Number(
                      item.cols
                    )} lg:grid-cols-${Number(item.cols)} `}
                  >
                    {item.childrens?.map((child, indexChild) => {
                      return (
                        (child.typeField === "text" ||
                          child.typeField === "number") && (
                          <Field
                            key={indexChild}
                            type={child.typeField}
                            name={child.bind as string}
                            register={register}
                            variant="filled"
                            label={child.placeholder}
                            className={`${
                              child.widthField ? child.widthField : "w-full"
                            } rounded-lg border border-stroke py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none`}
                            mask={child.mask}
                          />
                        )
                      );
                    })}
                  </div>
                </div>
              );
            }

            // if (item.typeField === "text") {
            //   return Field;
            // }
          })
        ) : (
          <h1 className="text-2xl"></h1>
        )}
        {/* <Field
        register={register}
        className="w-full text-black"
        label="react-maskformat"
        // onChange={handleChange}
        name={"maskformat"}
        id="formatted-maskformat-input"
        InputProps={{
          inputComponent: TextMaskCustom as never,
        }}
        variant="filled"
      />
      <Field
        register={register}
        className="text-black"
        label="react-number-format"
        // defaultValue={values.numberformat}
        // onChange={handleChange}
        name="numberformat"
        id="formatted-numberformat-input"
        InputProps={{
          inputComponent: NumericFormatCustom as never,
        }}
        variant="filled"
      />
      <h1>{watch("numberformat")}</h1>
      <h1>{watch("maskformat")}</h1> */}

        <button
          type="submit"
          className="mt-8 w-[220px]  cursor-pointer rounded-lg border border-primary bg-primary p-3 text-white hover:bg-opacity-90"
        >
          Cadastrar
        </button>
      </Box>
    </div>
  );
};
export default FormUiComponent;
