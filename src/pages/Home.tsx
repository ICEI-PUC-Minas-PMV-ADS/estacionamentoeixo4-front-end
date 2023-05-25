import About from "./About";
import Logo from "@images/logo/why_park_logo.png";
const Home = () => {
  return (
    <div className="w-full h-full overflow-x-hidden">
      <div className="w-screen h-auto min-h-screen overflow-auto">
        <div className="relative flex justify-center object-cover object-center w-screen h-screen bg-center bg-cover item-center bg-opacity-60 bg-banner">
          <div className="absolute w-full h-full bg-black"></div>
          <img src={Logo} alt="" className="z-50 mt-20 h-80" />
        </div>
        <About />
      </div>
    </div>
  );
};

export default Home;
