import { SignInForm } from "../../components/auth/SignInForm";
import { BreadCrumb } from "../../components/content/BreadCrumb";

function SignIn() {
  return (
    <>
      <BreadCrumb title="Sign In" description="Log into your account" />
      <SignInForm />
    </>
  );
}
export default SignIn;
