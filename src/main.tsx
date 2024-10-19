import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { mainRouter } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import { store } from "./stores/index.ts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <>
    <ToastContainer hideProgressBar />
    <Provider store={store}>
      <RouterProvider router={mainRouter} />,
    </Provider>
  </>,
);
