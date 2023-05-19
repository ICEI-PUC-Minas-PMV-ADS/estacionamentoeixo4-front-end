// import Breadcrumb from "@src/components/Breadcrumb";
import About from "./About";
import Logo from "@images/logo/why_park_logo.png";
import ChartOne from "@src/components/ChartOne";
import ChartTwo from "@src/components/ChartTwo";
import ChartThree from "@src/components/ChartThree";
const Home = () => {
  return (
    <div className="h-full w-full overflow-x-hidden">
      <div className="h-auto min-h-screen w-screen overflow-auto">
        <div className="item-center relative flex h-screen w-screen justify-center bg-opacity-60 bg-banner bg-cover bg-center object-cover object-center">
          <div className="absolute h-full w-full bg-black"></div>
          <img src={Logo} alt="" className="z-50 mt-20 h-80" />
        </div>
        <About />
        <ChartOne />
        <ChartTwo />
        <ChartThree />
      </div>
    </div>
  );
};

export default Home;
