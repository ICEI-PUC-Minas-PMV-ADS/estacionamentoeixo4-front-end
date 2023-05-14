import React from "react";
import Breadcrumb from "./Breadcrumb";

type Tprops = {
  title: string;
};
export default class CrudComponent extends React.Component<
  Tprops,
  { [key: string]: string | number }
> {
  constructor(props: Tprops) {
    super(props);
  }
  override render(): JSX.Element {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="w-full">
          <Breadcrumb pageName={this.props.title} />
        </div>
        <div className="flex items-center justify-center w-full ">
          <div className="flex flex-col items-center justify-center w-full gap-9">
            {/* <!-- Contact Form --> */}
            <div className="w-full bg-white border rounded-sm border-stroke shadow-default dark:border-strokedark dark:bg-boxdark">
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Valor
                      </label>
                      <input
                        type="text"
                        placeholder="Valor"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Vagas gerais
                      </label>
                      <input
                        type="number"
                        placeholder="Número de vagas gerais"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Vagas preferenciais
                      </label>
                      <input
                        type="number"
                        placeholder="Número de vagas preferenciais"
                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <div className="mb-4.5 w-full flex flex-col gap-6 xl:flex-row">
                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        Razão social <span className="text-meta-1">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Razão social"
                        className="w-full  rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>

                    <div className="mb-4.5">
                      <label className="mb-2.5 block text-black dark:text-white">
                        CNPJ
                      </label>
                      <input
                        type="text"
                        placeholder="CNPJ "
                        className="w-full  rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      />
                    </div>
                  </div>
                  <button className="flex justify-center mx-auto w-full  mt-12  max-w-xs p-3 font-medium rounded bg-primary text-gray">
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
