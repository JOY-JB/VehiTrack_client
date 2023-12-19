import LoginPage from "@/components/login/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
