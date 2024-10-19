import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { HomePage, NotFoundPage, ProductsPage } from "../pages/home/index.lazy";
import { Loader } from "../components/content/Loader";
import { SignIn, SignUp } from "../pages/auth/index.lazy";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: (
          <Loader timeout={300}>
            <HomePage />
          </Loader>
        ),
      },
      {
        path: "/products/",
        element: (
          <Loader timeout={300}>
            <ProductsPage />
          </Loader>
        ),
      },
      {
        path: "/signIn",
        element: (
          <Loader>
            <SignIn />
          </Loader>
        ),
      },
      {
        path: "/signUp",
        element: (
          <Loader>
            <SignUp />
          </Loader>
        ),
      },
      {
        path: "*",
        element: (
          <Loader>
            <NotFoundPage />
          </Loader>
        ),
      },
    ],
  },
]);
