import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/Hero";
import KeyFeatures from "@/components/sections/KeyFeatures";
import HowItWorks from "@/components/sections/HowItWorks";
import WhoIsItFor from "@/components/sections/WhoIsItFor";
import DemoSection from "@/components/sections/DemoSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <Hero />
        <div className="relative z-10">
          <KeyFeatures />
          <HowItWorks />
          <WhoIsItFor />
          <DemoSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
