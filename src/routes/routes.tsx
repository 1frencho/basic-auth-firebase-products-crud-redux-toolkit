import { createBrowserRouter } from "react-router-dom";
import { HomePage, NotFoundPage, ProductsPage } from "../pages/home/index.lazy";
import { Loader } from "../components/content/Loader";
import { SignIn, SignUp } from "../pages/auth/index.lazy";
import { MainApp } from "../index.lazy";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

export const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Loader>
        <MainApp />
      </Loader>
    ),
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
          <ProtectedRoute>
            <Loader timeout={300}>
              <ProductsPage />
            </Loader>
          </ProtectedRoute>
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
