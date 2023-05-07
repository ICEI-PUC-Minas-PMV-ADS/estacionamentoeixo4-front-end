import DefaultLayout from "../layout/DefaultLayout";
import About from "./About";
import Logo from "../images/logo/logo.png";
const Home = () => {
  return (
    <DefaultLayout>
      <div className="w-screen h-auto min-h-screen overflow-auto">
        <div className="relative flex justify-center object-cover object-center w-screen h-screen bg-center bg-cover bg-banner item-center bg-opacity-60">
          <div className="absolute w-full h-full bg-black bg-opacity-60"></div>
          <img src={Logo} alt="" className="z-50 mt-20 h-80" />
        </div>

        <About />
      </div>
    </DefaultLayout>
  );
};

export default Home;