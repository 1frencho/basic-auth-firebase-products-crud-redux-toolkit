import { useSelector } from "react-redux";
import { RootState } from "../../stores";
import { Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function HomePage() {
  const { userInfo, loading, error, success } = useSelector(
    (state: RootState) => state.auth,
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <section className="flex flex-col justify-center gap-4 px-4 py-14">
        <div className="myCard h-96 bg-[url('/img/bg2.png')] bg-cover bg-center bg-no-repeat"></div>

        <div className="myCard flex flex-col justify-center gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Avatar
              size="lg"
              name={userInfo?.displayName || ""}
              src={userInfo?.photoURL || ""}
            />
            <div className="flex flex-col gap-2">
              <h2 className="text-xl font-semibold md:text-2xl">
                Welcome,{" "}
                {success
                  ? (userInfo?.displayName ?? "User")
                  : "Your are not authenticated."}
              </h2>
              <p className="text-base font-medium">
                This is a demo application for the{" "}
                <a
                  className="text-myPrimary transition-all duration-300 ease-in-out hover:underline"
                  href="https://www.github.com/1frencho/basic-auth-firebase-products-crud-redux-toolkit"
                  target="_blank"
                  rel="noreferrer"
                >
                  Basic Authentication and CRUD operations with Firebase
                </a>{" "}
                project.
              </p>
            </div>
          </div>
          {!success && (
            <div className="flex flex-col gap-2 md:flex-row">
              <Link to="/signIn" className="myPrimaryBtn">
                Sign into your account
              </Link>
              <Link to="/signUp" className="mySecondaryBtn">
                Create an account
              </Link>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export default HomePage;
