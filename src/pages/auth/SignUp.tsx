import { SignUpForm } from "../../components/auth/SignUpForm";
import { BreadCrumb } from "../../components/content/BreadCrumb";

function SignUp() {
  return (
    <>
      <BreadCrumb
        title="Sign Up"
        description="Authentication for your account"
      />
      <SignUpForm />
    </>
  );
}
export default SignUp;
