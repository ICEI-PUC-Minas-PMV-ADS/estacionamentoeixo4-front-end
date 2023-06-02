import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(_jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(App, {}), _jsx(ReactQueryDevtools, { initialIsOpen: false })] }));
