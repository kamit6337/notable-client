/* eslint-disable react-refresh/only-export-components */
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "react-quill/dist/quill.snow.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store.jsx";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import environment from "./utils/environment.js";
import { ToastContainer } from "react-toastify";

const PRODUCTION = "production";

if (environment.NODE_ENV === PRODUCTION) disableReactDevTools();

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <ToastContainer />
      </BrowserRouter>
    </Provider>

    {environment.NODE_ENV !== PRODUCTION && (
      <ReactQueryDevtools initialIsOpen={false} />
    )}
  </QueryClientProvider>
);
