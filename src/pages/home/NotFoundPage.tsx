import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <>
      <section className="flex h-[80vh] flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold">Page Not Found</h2>
        <Link to="/" className="myPrimaryBtn">
          Go to Home
        </Link>
      </section>
    </>
  );
}
export default NotFoundPage;
