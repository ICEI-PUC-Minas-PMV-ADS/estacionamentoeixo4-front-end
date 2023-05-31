import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./satoshi.css";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <App />
    {/* <ReactQueryDevtools  initialIsOpen={false} /> */}
  </QueryClientProvider>
);
