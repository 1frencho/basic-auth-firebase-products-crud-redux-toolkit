import { NavBar } from "../components/navigation/NavBar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};
