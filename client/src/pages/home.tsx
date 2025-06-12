import Header from "@/components/header";
import Hero from "@/components/hero";
import Services from "@/components/services";
import LoanApplication from "@/components/loan-application";
import TrackApplication from "@/components/track-application";
import CibilScore from "@/components/cibil-score";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import AgentLoginModal from "@/components/agent-login-modal";
import { useState } from "react";

export default function Home() {
  const [isAgentModalOpen, setIsAgentModalOpen] = useState(false);

  return (
    <>
      <Header onAgentLoginClick={() => setIsAgentModalOpen(true)} />
      <Hero />
      <Services />
      <LoanApplication />
      <TrackApplication />
      <CibilScore />
      <Contact />
      <Footer />
      <AgentLoginModal 
        isOpen={isAgentModalOpen} 
        onClose={() => setIsAgentModalOpen(false)} 
      />
    </>
  );
}
