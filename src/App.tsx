import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { MainLayout } from "./layout/MainLayout";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastContainer />

      <ChakraProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
