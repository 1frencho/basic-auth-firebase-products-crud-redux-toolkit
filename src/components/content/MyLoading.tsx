import { MyLogo } from "./MyLogo";

export const MyLoading = () => {
  return (
    <div className="relative flex h-[100vh] items-center justify-center">
      <MyLogo className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex-col" />
      {/* <FaApple className="text-main absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl" /> */}
      <div className="border-primary h-32 w-32 animate-spin rounded-full border-b-2 border-t-2"></div>
    </div>
  );
};
