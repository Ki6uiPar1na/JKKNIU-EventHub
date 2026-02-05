import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CSCRegistrationForm from "@/components/CSCRegistrationForm";

const CSCRegister = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <CSCRegistrationForm />
      <Footer />
    </div>
  );
};

export default CSCRegister;
