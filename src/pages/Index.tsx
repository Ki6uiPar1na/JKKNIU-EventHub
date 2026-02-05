import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import RunningRegistrations from "@/components/RunningRegistrations";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      {/* Auto-scrolling running registrations */}
      <RunningRegistrations />
      <Footer />
    </div>
  );
};

export default Index;
