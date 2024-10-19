import { Outlet } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { MainLayout } from "./layout/MainLayout";

import { useFBAuth } from "./hooks/useFBAuth";

function App() {
  useFBAuth();

  return (
    <>
      <ChakraProvider>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </ChakraProvider>
    </>
  );
}

export default App;
