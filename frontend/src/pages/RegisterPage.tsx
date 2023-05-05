import RegisterForm from "../components/RegisterForm";
import Navbar from "../components/NotAuthenticated/Navbar/Navbar";
import Footer from "./GeneralSections/Footer";

function RegisterPage() {
  return (
    <div>
      <RegisterForm />
      <Footer />
    </div>
  );
}

export default RegisterPage;
