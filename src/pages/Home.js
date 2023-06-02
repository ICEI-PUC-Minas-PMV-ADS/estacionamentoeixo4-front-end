import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import About from "./About";
import Logo from "@images/logo/why_park_logo.png";
const Home = () => {
    return (_jsx("div", { className: "w-full h-full overflow-x-hidden", children: _jsxs("div", { className: "w-screen h-auto min-h-screen overflow-auto", children: [_jsxs("div", { className: "relative flex justify-center object-cover object-center w-screen h-screen bg-center bg-cover item-center bg-opacity-60 bg-banner", children: [_jsx("div", { className: "absolute w-full h-full bg-black" }), _jsx("img", { src: Logo, alt: "", className: "z-50 mt-20 h-80" })] }), _jsx(About, {})] }) }));
};
export default Home;
