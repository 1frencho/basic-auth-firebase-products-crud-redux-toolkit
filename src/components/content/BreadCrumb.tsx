interface BreadCrumb {
  title: string;
  description: string;
}

export const BreadCrumb = ({ title, description }: BreadCrumb) => {
  return (
    <>
      <div className="flex h-[300px] flex-col items-start justify-center gap-3 bg-[url('/img/bg.png')] bg-cover bg-center bg-no-repeat px-6">
        <h2 className="flex gap-2 text-2xl font-semibold text-white md:text-3xl lg:text-4xl">
          <div className="border-l-8 border-myPrimary"></div>
          {title}
        </h2>
        <p className="text-lg font-medium text-white">{description}</p>
      </div>
    </>
  );
};
