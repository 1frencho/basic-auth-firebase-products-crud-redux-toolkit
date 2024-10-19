import { Link } from "react-router-dom";
import { TbError404 } from "react-icons/tb";

function NotFoundPage() {
  return (
    <>
      <section className="flex h-[80vh] flex-col items-center justify-center gap-2">
        <h2 className="flex items-center gap-2 text-2xl font-bold">
          {" "}
          <TbError404 size={100} className="m-0 text-myPrimary" />
          Page Not Found
        </h2>
        <Link to="/" className="myPrimaryBtn">
          Go to Home
        </Link>
      </section>
    </>
  );
}
export default NotFoundPage;
